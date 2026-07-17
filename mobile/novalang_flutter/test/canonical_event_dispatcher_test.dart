import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/canonical_event.dart';
import 'package:novalang_flutter/repositories/canonical_event_repository.dart';
import 'package:novalang_flutter/services/canonical_event_dispatcher.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _userId = 'user-1';
const _trackId = 'daily_life';
const _lessonId = 'ja-daily_life-m01-u1-l1';

CanonicalEventAppendRequest request({
  String sourceRecordId = 'completion-1',
  String sourceRecordType = 'lesson_completion',
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
  String idempotencyKey = 'event-key-1',
  Map<String, dynamic> payload = const {},
}) => CanonicalEventAppendRequest.create(
  eventType: CanonicalEventType.lessonCompletionRecorded,
  sourceRecordId: sourceRecordId,
  sourceRecordType: sourceRecordType,
  userId: userId,
  userTrackId: userTrackId,
  lessonId: lessonId,
  requestedAt: DateTime.utc(2026, 7, 14, 10),
  idempotencyKey: idempotencyKey,
  payload: payload,
);

class _Ids implements CanonicalEventIdGenerator {
  _Ids([this.prefix = 'event']);

  final String prefix;
  int index = 0;

  @override
  String nextId() => '$prefix-${++index}';
}

class _Clock implements CanonicalEventClock {
  _Clock([DateTime? value]) : value = value ?? DateTime.utc(2026, 7, 14, 10, 1);

  final DateTime value;

  @override
  DateTime now() => value;
}

class _RecordingSubscriber implements CanonicalEventSubscriber {
  _RecordingSubscriber(this.subscriberId);

  @override
  final String subscriberId;
  final List<CanonicalEvent> received = [];

  @override
  Future<void> handle(CanonicalEvent event) async {
    received.add(event);
  }
}

class _FlakySubscriber implements CanonicalEventSubscriber {
  _FlakySubscriber(this.subscriberId, {required this.failuresBeforeSuccess});

  @override
  final String subscriberId;
  final int failuresBeforeSuccess;
  int attempts = 0;
  final List<CanonicalEvent> succeededFor = [];

  @override
  Future<void> handle(CanonicalEvent event) async {
    attempts += 1;
    if (attempts <= failuresBeforeSuccess) {
      throw StateError('$subscriberId simulated failure on attempt $attempts');
    }
    succeededFor.add(event);
  }
}

LocalCanonicalEventDispatcher dispatcher({
  CanonicalEventRepository? events,
  CanonicalEventIdGenerator? ids,
  CanonicalEventClock? clock,
}) => LocalCanonicalEventDispatcher(
  events: events ?? SharedPreferencesCanonicalEventRepository(),
  clock: clock ?? _Clock(),
  ids: ids ?? _Ids(),
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  group('contract models', () {
    test('model wire values round trip through contract JSON', () {
      final event = CanonicalEvent.create(
        eventId: 'event-1',
        eventType: CanonicalEventType.lessonCompletionRecorded,
        sourceRecordId: 'completion-1',
        sourceRecordType: 'lesson_completion',
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
        occurredAt: DateTime.utc(2026, 7, 14, 10, 1),
        idempotencyKey: 'event-key-1',
      );

      expect(
        CanonicalEventAppendRequest.fromJson(request().toJson()).sourceRecordId,
        'completion-1',
      );
      expect(CanonicalEvent.fromJson(event.toJson()).eventId, 'event-1');
      expect(
        CanonicalEventAppendResult.fromJson(
          CanonicalEventAppendResult.appended(event).toJson(),
        ).status,
        CanonicalEventAppendStatus.appended,
      );
      expect(
        CanonicalEventType.lessonCompletionRecorded.wire,
        'lesson_completion_recorded',
      );
    });

    test('unknown contract field is rejected', () {
      expect(
        () => CanonicalEventAppendRequest.fromJson({
          ...request().toJson(),
          'unexpected': true,
        }),
        throwsFormatException,
      );
    });

    test('non-object payload is rejected', () {
      expect(
        () => CanonicalEventAppendRequest.fromJson({
          ...request().toJson(),
          'payload': 'not-an-object',
        }),
        throwsFormatException,
      );
    });

    test('unsupported contract version is rejected', () {
      expect(
        () => CanonicalEventAppendRequest.create(
          eventType: CanonicalEventType.lessonCompletionRecorded,
          sourceRecordId: 'completion-1',
          sourceRecordType: 'lesson_completion',
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          requestedAt: DateTime.utc(2026),
          idempotencyKey: 'key',
          contractVersion: '2.0',
        ),
        throwsFormatException,
      );
    });
  });

  group('canonical event dispatcher — append', () {
    test('first append persists exactly one event', () async {
      final result = await dispatcher().append(request());

      expect(result.status, CanonicalEventAppendStatus.appended);
      expect(result.event?.sourceRecordId, 'completion-1');
      expect(result.event?.eventType, CanonicalEventType.lessonCompletionRecorded);
    });

    test(
      'duplicate idempotency key returns the same event without creating a new one',
      () async {
        final repository = SharedPreferencesCanonicalEventRepository();
        final first = await dispatcher(events: repository).append(request());
        final second = await dispatcher(events: repository).append(request());

        expect(second.status, CanonicalEventAppendStatus.appended);
        expect(second.event?.eventId, first.event?.eventId);

        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesCanonicalEventRepository.storageKey,
        );
        expect(jsonDecode(raw!) as List, hasLength(1));
      },
    );

    test(
      'same sourceRecordId with a different idempotency key does not create a second event',
      () async {
        final repository = SharedPreferencesCanonicalEventRepository();
        final first = await dispatcher(events: repository).append(request());
        final second = await dispatcher(events: repository).append(
          request(idempotencyKey: 'event-key-2'),
        );

        expect(second.status, CanonicalEventAppendStatus.alreadyAppended);
        expect(second.existingEventId, first.event?.eventId);

        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesCanonicalEventRepository.storageKey,
        );
        expect(jsonDecode(raw!) as List, hasLength(1));
      },
    );

    test(
      'two concurrent appends for the same event create exactly one event',
      () async {
        final repositoryOne = SharedPreferencesCanonicalEventRepository();
        final repositoryTwo = SharedPreferencesCanonicalEventRepository();
        final dispatcherOne = dispatcher(events: repositoryOne, ids: _Ids('first'));
        final dispatcherTwo = dispatcher(events: repositoryTwo, ids: _Ids('second'));

        final results = await Future.wait([
          dispatcherOne.append(request()),
          dispatcherTwo.append(request(idempotencyKey: 'event-key-2')),
        ]);

        final appended = results
            .where((r) => r.status == CanonicalEventAppendStatus.appended)
            .toList();
        final already = results
            .where((r) => r.status == CanonicalEventAppendStatus.alreadyAppended)
            .toList();
        expect(appended, hasLength(1));
        expect(already, hasLength(1));
        expect(appended.single.event!.eventId, already.single.existingEventId);

        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesCanonicalEventRepository.storageKey,
        );
        expect(jsonDecode(raw!) as List, hasLength(1));
      },
    );

    test('appended event is immutable across repeated reads', () async {
      final repository = SharedPreferencesCanonicalEventRepository();
      await dispatcher(events: repository).append(request());

      final first = await repository.findByIdempotencyKey('event-key-1');
      final second = await repository.findByIdempotencyKey('event-key-1');

      expect(first?.toJson(), second?.toJson());
      expect(first?.occurredAt, second?.occurredAt);
    });
  });

  group('canonical event repository', () {
    test('events persist after repository restart', () async {
      await SharedPreferencesCanonicalEventRepository().save(
        CanonicalEvent.create(
          eventId: 'event-1',
          eventType: CanonicalEventType.lessonCompletionRecorded,
          sourceRecordId: 'completion-1',
          sourceRecordType: 'lesson_completion',
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          occurredAt: DateTime.utc(2026, 7, 14, 10, 1),
          idempotencyKey: 'event-key-1',
        ),
      );

      final restored = await SharedPreferencesCanonicalEventRepository()
          .findByIdempotencyKey('event-key-1');

      expect(restored?.eventId, 'event-1');
    });

    test(
      'corrupted storage throws and does not overwrite the raw value',
      () async {
        const corrupted = '{not-valid-json';
        SharedPreferences.setMockInitialValues({
          SharedPreferencesCanonicalEventRepository.storageKey: corrupted,
        });
        final repository = SharedPreferencesCanonicalEventRepository();

        await expectLater(
          repository.findByIdempotencyKey('event-key-1'),
          throwsA(isA<CanonicalEventStorageException>()),
        );
        await expectLater(
          repository.save(
            CanonicalEvent.create(
              eventId: 'event-2',
              eventType: CanonicalEventType.lessonCompletionRecorded,
              sourceRecordId: 'completion-2',
              sourceRecordType: 'lesson_completion',
              userId: _userId,
              userTrackId: _trackId,
              lessonId: _lessonId,
              occurredAt: DateTime.utc(2026, 7, 14, 10, 1),
              idempotencyKey: 'event-key-2',
            ),
          ),
          throwsA(isA<CanonicalEventStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesCanonicalEventRepository.storageKey,
          ),
          corrupted,
        );
      },
    );
  });

  group('canonical event dispatch', () {
    test('dispatch calls every subscriber in registration order', () async {
      final calls = <String>[];
      final subscriberA = _RecordingSubscriber('core5');
      final subscriberB = _RecordingSubscriber('core6');
      final localDispatcher = dispatcher();
      localDispatcher.subscribe(
        _OrderTrackingSubscriber(subscriberA, calls),
      );
      localDispatcher.subscribe(
        _OrderTrackingSubscriber(subscriberB, calls),
      );

      final result = await localDispatcher.append(request());
      final outcome = await localDispatcher.dispatch(result.event!);

      expect(calls, ['core5', 'core6']);
      expect(outcome.allSucceeded, isTrue);
      expect(subscriberA.received.single.eventId, result.event!.eventId);
      expect(subscriberB.received.single.eventId, result.event!.eventId);
    });

    test(
      'a subscriber failure does not delete the event and can be retried',
      () async {
        final flaky = _FlakySubscriber('core5', failuresBeforeSuccess: 1);
        final localDispatcher = dispatcher();
        localDispatcher.subscribe(flaky);

        final append = await localDispatcher.append(request());
        final firstOutcome = await localDispatcher.dispatch(append.event!);
        expect(firstOutcome.allSucceeded, isFalse);
        expect(firstOutcome.failedSubscriberIds, ['core5']);

        final storedAfterFailure = await SharedPreferencesCanonicalEventRepository()
            .findByIdempotencyKey('event-key-1');
        expect(storedAfterFailure, isNotNull);

        final retryOutcome = await localDispatcher.dispatch(append.event!);
        expect(retryOutcome.allSucceeded, isTrue);
        expect(flaky.succeededFor.single.eventId, append.event!.eventId);
      },
    );

    test(
      'appendAndDispatch persists the event before invoking subscribers',
      () async {
        final subscriber = _RecordingSubscriber('core5');
        final localDispatcher = dispatcher();
        localDispatcher.subscribe(subscriber);

        final outcome = await localDispatcher.appendAndDispatch(request());

        expect(outcome.allSucceeded, isTrue);
        expect(
          await SharedPreferencesCanonicalEventRepository()
              .findByIdempotencyKey('event-key-1'),
          isNotNull,
        );
        expect(subscriber.received.single.eventId, outcome.event.eventId);
      },
    );
  });

  group('canonical event deep immutability and sourceRecordType', () {
    CanonicalEvent nestedEvent([Map<String, dynamic>? payload]) =>
        CanonicalEvent.create(
          eventId: 'event-immutable-1',
          eventType: CanonicalEventType.lessonCompletionRecorded,
          sourceRecordId: 'completion-immutable-1',
          sourceRecordType: 'lesson_completion',
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
          occurredAt: DateTime.utc(2026, 7, 14, 10, 1),
          idempotencyKey: 'event-immutable-1',
          payload:
              payload ??
              {
                'nested': {'flag': true},
                'items': ['a', 'b'],
              },
        );

    test('top-level payload mutation is blocked', () {
      final event = nestedEvent();
      expect(
        () => event.payload['hacked'] = true,
        throwsUnsupportedError,
      );
    });

    test('nested map mutation is blocked', () {
      final event = nestedEvent();
      expect(
        () => (event.payload['nested'] as Map)['flag'] = false,
        throwsUnsupportedError,
      );
    });

    test('nested list mutation is blocked', () {
      final event = nestedEvent();
      expect(
        () => (event.payload['items'] as List).add('c'),
        throwsUnsupportedError,
      );
    });

    test('subscriber A cannot mutate payload seen by subscriber B', () async {
      final subscriberA = _MutatingSubscriber('a');
      final subscriberB = _RecordingSubscriber('b');
      final localDispatcher = dispatcher();
      localDispatcher.subscribe(subscriberA);
      localDispatcher.subscribe(subscriberB);

      final outcome = await localDispatcher.appendAndDispatch(
        request(
          payload: {
            'nested': {'flag': true},
            'items': ['a'],
          },
        ),
      );

      expect(outcome.allSucceeded, isFalse);
      expect(subscriberA.sawMutationError, isTrue);
      expect(subscriberB.received, hasLength(1));
      expect(subscriberB.received.single.payload['nested'], {'flag': true});
      expect(subscriberB.received.single.payload['items'], ['a']);
    });

    test('mutating input map after create does not change the event', () {
      final input = <String, dynamic>{
        'nested': <String, dynamic>{'flag': true},
        'items': <dynamic>['a'],
      };
      final event = nestedEvent(input);
      input['nested'] = {'flag': false};
      (input['items'] as List).add('b');
      expect(event.payload['nested'], {'flag': true});
      expect(event.payload['items'], ['a']);
    });

    test('mutating toJson output does not change the event', () {
      final event = nestedEvent();
      final json = event.toJson();
      (json['payload'] as Map)['hacked'] = true;
      ((json['payload'] as Map)['nested'] as Map)['flag'] = false;
      ((json['payload'] as Map)['items'] as List).add('z');
      expect(event.payload.containsKey('hacked'), isFalse);
      expect(event.payload['nested'], {'flag': true});
      expect(event.payload['items'], ['a', 'b']);
    });

    test('repository read returns the original canonical payload', () async {
      final repository = SharedPreferencesCanonicalEventRepository();
      final event = nestedEvent();
      await repository.save(event);

      final loaded = await repository.findById(event.eventId);
      expect(loaded!.payload['nested'], {'flag': true});
      expect(loaded.payload['items'], ['a', 'b']);
      expect(
        () => loaded.payload['hacked'] = true,
        throwsUnsupportedError,
      );
    });

    test('unsupported JSON payload types are rejected', () {
      expect(
        () => nestedEvent({'bad': DateTime.utc(2026)}),
        throwsA(isA<FormatException>()),
      );
      expect(
        () => deepFreezeJson(Object()),
        throwsA(isA<FormatException>()),
      );
    });

    test('sourceRecordType must equal lesson_completion', () {
      for (final bad in ['anything', 'completion', 'lesson']) {
        expect(
          () => CanonicalEvent.create(
            eventId: 'event-bad-source',
            eventType: CanonicalEventType.lessonCompletionRecorded,
            sourceRecordId: 'completion-bad-source',
            sourceRecordType: bad,
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
            occurredAt: DateTime.utc(2026, 7, 14, 10, 1),
            idempotencyKey: 'event-bad-source-$bad',
          ),
          throwsA(
            isA<FormatException>().having(
              (error) => error.message,
              'message',
              'sourceRecordType must equal lesson_completion',
            ),
          ),
          reason: bad,
        );
      }
      for (final bad in ['', ' ']) {
        expect(
          () => CanonicalEvent.create(
            eventId: 'event-bad-source-empty',
            eventType: CanonicalEventType.lessonCompletionRecorded,
            sourceRecordId: 'completion-bad-source-empty',
            sourceRecordType: bad,
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
            occurredAt: DateTime.utc(2026, 7, 14, 10, 1),
            idempotencyKey: 'event-bad-source-empty-$bad',
          ),
          throwsA(isA<FormatException>()),
          reason: 'empty-or-whitespace:$bad',
        );
      }
    });
  });
}

class _MutatingSubscriber implements CanonicalEventSubscriber {
  _MutatingSubscriber(this.subscriberId);

  @override
  final String subscriberId;
  bool sawMutationError = false;

  @override
  Future<void> handle(CanonicalEvent event) async {
    try {
      event.payload['hacked'] = true;
      (event.payload['nested'] as Map?)?['flag'] = false;
      (event.payload['items'] as List?)?.add('mutated');
    } on UnsupportedError {
      sawMutationError = true;
      rethrow;
    }
  }
}

class _OrderTrackingSubscriber implements CanonicalEventSubscriber {
  _OrderTrackingSubscriber(this._delegate, this._calls);

  final _RecordingSubscriber _delegate;
  final List<String> _calls;

  @override
  String get subscriberId => _delegate.subscriberId;

  @override
  Future<void> handle(CanonicalEvent event) async {
    _calls.add(subscriberId);
    await _delegate.handle(event);
  }
}
