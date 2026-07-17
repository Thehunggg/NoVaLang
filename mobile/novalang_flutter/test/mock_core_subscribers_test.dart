import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/canonical_event.dart';
import 'package:novalang_flutter/repositories/mock_subscriber_evidence_repository.dart';
import 'package:novalang_flutter/services/mock_core_subscribers.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _userId = 'user-1';
const _trackId = 'daily_life';
const _lessonId = 'ja-daily_life-m01-u1-l1';

CanonicalEvent event({
  String eventId = 'event-1',
  String sourceRecordId = 'completion-1',
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
}) => CanonicalEvent.create(
  eventId: eventId,
  eventType: CanonicalEventType.lessonCompletionRecorded,
  sourceRecordId: sourceRecordId,
  sourceRecordType: 'lesson_completion',
  userId: userId,
  userTrackId: userTrackId,
  lessonId: lessonId,
  occurredAt: DateTime.utc(2026, 7, 14, 10, 1),
  idempotencyKey: 'event:$sourceRecordId',
);

class _Ids implements MockEvidenceIdGenerator {
  _Ids([this.prefix = 'evidence']);

  final String prefix;
  int index = 0;

  @override
  String nextId() => '$prefix-${++index}';
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  group('mock core 5 subscriber', () {
    test('first event creates one evidence record', () async {
      final repository = SharedPreferencesMockCore5EvidenceRepository();
      final subscriber = MockCore5Subscriber(repository: repository, ids: _Ids());

      await subscriber.handle(event());

      final evidence = await repository.findByEventId('event-1');
      expect(evidence, isNotNull);
      expect(evidence!.subscriberType, MockCore5Subscriber.subscriberType);
      expect(evidence.sourceRecordId, 'completion-1');
    });

    test('duplicate event does not create a second evidence record', () async {
      final repository = SharedPreferencesMockCore5EvidenceRepository();
      final subscriber = MockCore5Subscriber(repository: repository, ids: _Ids());

      await subscriber.handle(event());
      await subscriber.handle(event());

      final all = await repository.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(all, hasLength(1));
    });

    test('isolation: different user/track produce separate evidence', () async {
      final repository = SharedPreferencesMockCore5EvidenceRepository();
      final subscriber = MockCore5Subscriber(repository: repository, ids: _Ids());

      await subscriber.handle(event());
      await subscriber.handle(
        event(eventId: 'event-2', sourceRecordId: 'completion-2', userId: 'user-2'),
      );
      await subscriber.handle(
        event(
          eventId: 'event-3',
          sourceRecordId: 'completion-3',
          userTrackId: 'business',
        ),
      );

      expect(
        await repository.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await repository.listForUserTrack(userId: 'user-2', userTrackId: _trackId),
        hasLength(1),
      );
      expect(
        await repository.listForUserTrack(userId: _userId, userTrackId: 'business'),
        hasLength(1),
      );
    });

    test('evidence persists after repository restart', () async {
      await MockCore5Subscriber(
        repository: SharedPreferencesMockCore5EvidenceRepository(),
        ids: _Ids(),
      ).handle(event());

      final restored = await SharedPreferencesMockCore5EvidenceRepository()
          .findByEventId('event-1');
      expect(restored, isNotNull);
    });

    test(
      'two concurrent handle() calls for the same event create exactly one evidence record',
      () async {
        final repositoryOne = SharedPreferencesMockCore5EvidenceRepository();
        final repositoryTwo = SharedPreferencesMockCore5EvidenceRepository();
        final subscriberOne = MockCore5Subscriber(
          repository: repositoryOne,
          ids: _Ids('first'),
        );
        final subscriberTwo = MockCore5Subscriber(
          repository: repositoryTwo,
          ids: _Ids('second'),
        );

        await Future.wait([
          subscriberOne.handle(event()),
          subscriberTwo.handle(event()),
        ]);

        expect(
          await repositoryOne.listForUserTrack(userId: _userId, userTrackId: _trackId),
          hasLength(1),
        );
      },
    );

    test(
      'corrupted storage throws instead of silently treating evidence as absent',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesMockCore5EvidenceRepository.storageKey: '{not-valid-json',
        });
        final subscriber = MockCore5Subscriber(
          repository: SharedPreferencesMockCore5EvidenceRepository(),
          ids: _Ids(),
        );

        await expectLater(
          subscriber.handle(event()),
          throwsA(isA<MockSubscriberEvidenceStorageException>()),
        );
      },
    );
  });

  group('mock core 6 subscriber', () {
    test('first event creates one evidence record', () async {
      final repository = SharedPreferencesMockCore6EvidenceRepository();
      final subscriber = MockCore6Subscriber(repository: repository, ids: _Ids());

      await subscriber.handle(event());

      final evidence = await repository.findByEventId('event-1');
      expect(evidence, isNotNull);
      expect(evidence!.subscriberType, MockCore6Subscriber.subscriberType);
    });

    test('duplicate event does not create a second evidence record', () async {
      final repository = SharedPreferencesMockCore6EvidenceRepository();
      final subscriber = MockCore6Subscriber(repository: repository, ids: _Ids());

      await subscriber.handle(event());
      await subscriber.handle(event());

      expect(
        await repository.listForUserTrack(userId: _userId, userTrackId: _trackId),
        hasLength(1),
      );
    });

    test('evidence persists after repository restart', () async {
      await MockCore6Subscriber(
        repository: SharedPreferencesMockCore6EvidenceRepository(),
        ids: _Ids(),
      ).handle(event());

      final restored = await SharedPreferencesMockCore6EvidenceRepository()
          .findByEventId('event-1');
      expect(restored, isNotNull);
    });

    test(
      'two concurrent handle() calls for the same event create exactly one evidence record',
      () async {
        final repositoryOne = SharedPreferencesMockCore6EvidenceRepository();
        final repositoryTwo = SharedPreferencesMockCore6EvidenceRepository();
        final subscriberOne = MockCore6Subscriber(
          repository: repositoryOne,
          ids: _Ids('first'),
        );
        final subscriberTwo = MockCore6Subscriber(
          repository: repositoryTwo,
          ids: _Ids('second'),
        );

        await Future.wait([
          subscriberOne.handle(event()),
          subscriberTwo.handle(event()),
        ]);

        expect(
          await repositoryOne.listForUserTrack(userId: _userId, userTrackId: _trackId),
          hasLength(1),
        );
      },
    );

    test(
      'corrupted storage throws instead of silently treating evidence as absent',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesMockCore6EvidenceRepository.storageKey: '{not-valid-json',
        });
        final subscriber = MockCore6Subscriber(
          repository: SharedPreferencesMockCore6EvidenceRepository(),
          ids: _Ids(),
        );

        await expectLater(
          subscriber.handle(event()),
          throwsA(isA<MockSubscriberEvidenceStorageException>()),
        );
      },
    );
  });

  group('core 5 and core 6 independence', () {
    test('evidence storage is independent between Core 5 and Core 6', () async {
      final core5Repository = SharedPreferencesMockCore5EvidenceRepository();
      final core6Repository = SharedPreferencesMockCore6EvidenceRepository();
      final core5 = MockCore5Subscriber(repository: core5Repository, ids: _Ids('c5'));
      final core6 = MockCore6Subscriber(repository: core6Repository, ids: _Ids('c6'));

      await core5.handle(event());
      final core6Before = await core6Repository.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(core6Before, isEmpty);

      await core6.handle(event());
      final core5After = await core5Repository.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      final core6After = await core6Repository.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(core5After, hasLength(1));
      expect(core6After, hasLength(1));
      expect(core5After.single.subscriberType, MockCore5Subscriber.subscriberType);
      expect(core6After.single.subscriberType, MockCore6Subscriber.subscriberType);
    });

    test(
      'both subscribers can independently process the same dispatched event',
      () async {
        final core5Repository = SharedPreferencesMockCore5EvidenceRepository();
        final core6Repository = SharedPreferencesMockCore6EvidenceRepository();
        final core5 = MockCore5Subscriber(repository: core5Repository, ids: _Ids('c5'));
        final core6 = MockCore6Subscriber(repository: core6Repository, ids: _Ids('c6'));
        final sharedEvent = event();

        await Future.wait([core5.handle(sharedEvent), core6.handle(sharedEvent)]);

        expect((await core5Repository.findByEventId('event-1'))?.eventId, 'event-1');
        expect((await core6Repository.findByEventId('event-1'))?.eventId, 'event-1');
      },
    );
  });
}
