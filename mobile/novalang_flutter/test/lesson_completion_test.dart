import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/lesson_completion.dart';
import 'package:novalang_flutter/repositories/lesson_completion_repository.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:novalang_flutter/services/lesson_completion_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _userId = 'user-1';
const _trackId = 'daily_life';
const _lessonId = 'ja-daily_life-m01-u1-l1';
const _attemptId = 'attempt-1';

ExerciseAttemptSnapshot attempt({
  String attemptId = _attemptId,
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
  bool isCompleted = true,
}) => ExerciseAttemptSnapshot(
  userId: userId,
  userTrackId: userTrackId,
  attemptId: attemptId,
  lessonId: lessonId,
  currentExerciseIndex: 13,
  orderByExercise: const {},
  results: const {},
  answers: const {},
  startedAt: '2026-07-14T00:00:00Z',
  lastUpdatedAt: '2026-07-14T00:30:00Z',
  isCompleted: isCompleted,
);

LessonCompletionRequest request({
  String attemptId = _attemptId,
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
  String idempotencyKey = 'key-1',
}) => LessonCompletionRequest.create(
  attemptId: attemptId,
  userId: userId,
  userTrackId: userTrackId,
  lessonId: lessonId,
  requestedAt: DateTime.utc(2026, 7, 14),
  idempotencyKey: idempotencyKey,
);

LessonCompletionRecord record({
  String completionId = 'completion-1',
  String attemptId = _attemptId,
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
  String idempotencyKey = 'key-1',
}) => LessonCompletionRecord.create(
  completionId: completionId,
  attemptId: attemptId,
  userId: userId,
  userTrackId: userTrackId,
  lessonId: lessonId,
  completedAt: DateTime.utc(2026, 7, 14, 1),
  idempotencyKey: idempotencyKey,
);

class _Attempts implements ExerciseAttemptRepository {
  _Attempts(Iterable<ExerciseAttemptSnapshot> values)
    : values = {for (final value in values) value.attemptId: value};

  final Map<String, ExerciseAttemptSnapshot> values;

  @override
  Future<ExerciseAttemptSnapshot?> findByAttemptId(String attemptId) async =>
      values[attemptId];

  @override
  Future<ExerciseAttemptSnapshot?> active({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async => null;

  @override
  Future<void> save(ExerciseAttemptSnapshot snapshot) async {}

  @override
  Future<void> complete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async {}
}

class _Ids implements CompletionIdGenerator {
  _Ids([this.prefix = 'completion']);

  final String prefix;
  int index = 0;

  @override
  String nextId() => '$prefix-${++index}';
}

class _Clock implements CompletionClock {
  @override
  DateTime now() => DateTime.utc(2026, 7, 14, 1);
}

class _Eligibility implements LessonCompletionEligibility {
  _Eligibility(this.allowed);

  final bool allowed;
  int calls = 0;

  @override
  Future<bool> canComplete({
    required String userId,
    required String userTrackId,
    required String lessonId,
  }) async {
    calls += 1;
    return allowed;
  }
}

LocalLessonCompletionService service({
  Iterable<ExerciseAttemptSnapshot>? attempts,
  LessonCompletionRepository? completions,
  LessonCompletionEligibility? eligibility,
  CompletionIdGenerator? ids,
}) => LocalLessonCompletionService(
  attempts: _Attempts(attempts ?? [attempt()]),
  completions: completions ?? SharedPreferencesLessonCompletionRepository(),
  eligibility: eligibility ?? _Eligibility(true),
  clock: _Clock(),
  ids: ids ?? _Ids(),
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  group('contract models', () {
    test('model wire values round trip through contract JSON', () {
      final completionRecord = record();

      expect(
        LessonCompletionRequest.fromJson(request().toJson()).userTrackId,
        _trackId,
      );
      expect(
        LessonCompletionRecord.fromJson(completionRecord.toJson()).completionId,
        'completion-1',
      );
      expect(
        LessonCompletionResult.fromJson(
          LessonCompletionResult.recorded(completionRecord).toJson(),
        ).status,
        LessonCompletionStatus.recorded,
      );
      expect(LessonCompletionStatus.alreadyCompleted.wire, 'already_completed');
    });

    test('unknown contract field is rejected', () {
      expect(
        () => LessonCompletionRequest.fromJson({
          ...request().toJson(),
          'unexpected': true,
        }),
        throwsFormatException,
      );
    });

    test('unsupported contract version is rejected', () {
      expect(
        () => LessonCompletionRequest.create(
          attemptId: _attemptId,
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

    test('empty and whitespace identity fields are rejected', () {
      for (final value in ['', '  ']) {
        expect(
          () => LessonCompletionRequest.create(
            attemptId: value,
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
            requestedAt: DateTime.utc(2026),
            idempotencyKey: 'key',
          ),
          throwsFormatException,
        );
      }
    });

    test('datetime without timezone is rejected during deserialization', () {
      expect(
        () => LessonCompletionRequest.fromJson({
          ...request().toJson(),
          'requestedAt': '2026-07-14T10:00:00',
        }),
        throwsFormatException,
      );
    });

    test('invalid result field combination is rejected', () {
      expect(
        () => LessonCompletionResult.fromJson({
          'status': 'recorded',
          'existingCompletionId': 'completion-1',
          'contractVersion': lessonCompletionContractVersion,
        }),
        throwsFormatException,
      );
    });

    test('named result factories enforce each valid result shape', () {
      expect(LessonCompletionResult.recorded(record()).record, isNotNull);
      expect(
        LessonCompletionResult.alreadyCompleted(
          'completion-1',
        ).existingCompletionId,
        'completion-1',
      );
      expect(
        LessonCompletionResult.invalidAttempt().toJson().keys,
        containsAll(['status', 'contractVersion']),
      );
      expect(
        LessonCompletionResult.notEligible().toJson().keys,
        containsAll(['status', 'contractVersion']),
      );
    });
  });

  group('completion service', () {
    test('valid completed attempt records one completion', () async {
      final result = await service().complete(request());

      expect(result.status, LessonCompletionStatus.recorded);
      expect(result.record?.userTrackId, _trackId);
    });

    test('attempt with a different user returns invalid_attempt', () async {
      final result = await service(
        attempts: [attempt(userId: 'other-user')],
      ).complete(request());

      expect(result.status, LessonCompletionStatus.invalidAttempt);
    });

    test('attempt with a different lesson returns invalid_attempt', () async {
      final result = await service(
        attempts: [attempt(lessonId: 'other-lesson')],
      ).complete(request());

      expect(result.status, LessonCompletionStatus.invalidAttempt);
    });

    test(
      'attempt with a different user track returns invalid_attempt',
      () async {
        final result = await service(
          attempts: [attempt(userTrackId: 'business')],
        ).complete(request());

        expect(result.status, LessonCompletionStatus.invalidAttempt);
      },
    );

    test('incomplete attempt returns invalid_attempt', () async {
      final result = await service(
        attempts: [attempt(isCompleted: false)],
      ).complete(request());

      expect(result.status, LessonCompletionStatus.invalidAttempt);
    });

    test('ineligible new completion returns not_eligible', () async {
      final result = await service(
        eligibility: _Eligibility(false),
      ).complete(request());

      expect(result.status, LessonCompletionStatus.notEligible);
    });

    test(
      'same idempotency key and identity returns recorded existing',
      () async {
        final completionService = service();
        final first = await completionService.complete(request());
        final second = await completionService.complete(request());

        expect(second.status, LessonCompletionStatus.recorded);
        expect(second.record?.completionId, first.record?.completionId);
      },
    );

    test(
      'same idempotency key with different attempt, user, track, or lesson conflicts',
      () async {
        final completionService = service();
        await completionService.complete(request());
        final conflicts = [
          request(attemptId: 'attempt-2'),
          request(userId: 'user-2'),
          request(userTrackId: 'business'),
          request(lessonId: 'lesson-2'),
        ];

        for (final conflictingRequest in conflicts) {
          await expectLater(
            completionService.complete(conflictingRequest),
            throwsA(isA<IdempotencyConflictException>()),
          );
        }
      },
    );

    test(
      'same attempt with a different key returns recorded existing',
      () async {
        final completionService = service();
        final first = await completionService.complete(request());
        final second = await completionService.complete(
          request(idempotencyKey: 'key-2'),
        );

        expect(second.status, LessonCompletionStatus.recorded);
        expect(second.record?.completionId, first.record?.completionId);
      },
    );

    test(
      'different attempt in same scope returns already_completed before eligibility',
      () async {
        final repository = SharedPreferencesLessonCompletionRepository();
        await service(completions: repository).complete(request());
        final denied = _Eligibility(false);
        final second = await service(
          attempts: [attempt(attemptId: 'attempt-2')],
          completions: repository,
          eligibility: denied,
        ).complete(request(attemptId: 'attempt-2', idempotencyKey: 'key-2'));

        expect(second.status, LessonCompletionStatus.alreadyCompleted);
        expect(denied.calls, 0);
      },
    );

    test('same lesson for a different user records independently', () async {
      final repository = SharedPreferencesLessonCompletionRepository();
      await service(completions: repository).complete(request());
      final second =
          await service(
            attempts: [attempt(attemptId: 'attempt-2', userId: 'user-2')],
            completions: repository,
            ids: _Ids('other-user-completion'),
          ).complete(
            request(
              attemptId: 'attempt-2',
              userId: 'user-2',
              idempotencyKey: 'key-2',
            ),
          );

      expect(second.status, LessonCompletionStatus.recorded);
    });

    test(
      'same lesson for a different user track records independently',
      () async {
        final repository = SharedPreferencesLessonCompletionRepository();
        await service(completions: repository).complete(request());
        final second =
            await service(
              attempts: [
                attempt(attemptId: 'attempt-2', userTrackId: 'business'),
              ],
              completions: repository,
              ids: _Ids('other-track-completion'),
            ).complete(
              request(
                attemptId: 'attempt-2',
                userTrackId: 'business',
                idempotencyKey: 'key-2',
              ),
            );

        expect(second.status, LessonCompletionStatus.recorded);
      },
    );

    test(
      'two concurrent calls on the same service create one record',
      () async {
        final completionService = service();
        final results = await Future.wait([
          completionService.complete(request()),
          completionService.complete(request()),
        ]);

        expect(
          results.map((result) => result.status),
          everyElement(LessonCompletionStatus.recorded),
        );
        expect(results.map((result) => result.record?.completionId).toSet(), {
          'completion-1',
        });
      },
    );

    test(
      'two concurrent service instances resolve repository uniqueness race',
      () async {
        final repositoryOne = SharedPreferencesLessonCompletionRepository();
        final repositoryTwo = SharedPreferencesLessonCompletionRepository();
        final serviceOne = service(
          completions: repositoryOne,
          ids: _Ids('first'),
        );
        final serviceTwo = service(
          completions: repositoryTwo,
          ids: _Ids('second'),
        );

        final results = await Future.wait([
          serviceOne.complete(request()),
          serviceTwo.complete(request()),
        ]);
        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesLessonCompletionRepository.storageKey,
        );

        expect(
          results.map((result) => result.status),
          everyElement(LessonCompletionStatus.recorded),
        );
        expect(results.map((result) => result.record?.completionId).toSet(), {
          results.first.record?.completionId,
        });
        expect(jsonDecode(raw!) as List, hasLength(1));
      },
    );
  });

  group('completion repository', () {
    test('records persist after repository restart', () async {
      await SharedPreferencesLessonCompletionRepository().save(record());

      final restored = await SharedPreferencesLessonCompletionRepository()
          .findByIdempotencyKey('key-1');

      expect(restored?.toJson(), record().toJson());
    });

    test('missing storage key is a valid empty repository', () async {
      final restored = await SharedPreferencesLessonCompletionRepository()
          .findByIdempotencyKey('missing');

      expect(restored, isNull);
    });

    test(
      'corrupted storage throws and failed read or save does not overwrite it',
      () async {
        const corrupted = '{not-valid-json';
        SharedPreferences.setMockInitialValues({
          SharedPreferencesLessonCompletionRepository.storageKey: corrupted,
        });
        final repository = SharedPreferencesLessonCompletionRepository();

        await expectLater(
          repository.findByIdempotencyKey('key'),
          throwsA(isA<LessonCompletionStorageException>()),
        );
        await expectLater(
          repository.save(record()),
          throwsA(isA<LessonCompletionStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesLessonCompletionRepository.storageKey,
          ),
          corrupted,
        );
      },
    );

    test(
      'contract-invalid stored record throws storage exception unchanged',
      () async {
        final invalid = record().toJson()..['contractVersion'] = '2.0';
        final raw = jsonEncode([invalid]);
        SharedPreferences.setMockInitialValues({
          SharedPreferencesLessonCompletionRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesLessonCompletionRepository().findByAttemptId(
            _attemptId,
          ),
          throwsA(isA<LessonCompletionStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesLessonCompletionRepository.storageKey,
          ),
          raw,
        );
      },
    );

    test(
      'immutable record cannot be replaced under the same completion ID',
      () async {
        final repository = SharedPreferencesLessonCompletionRepository();
        await repository.save(record());

        await expectLater(
          repository.save(
            record(
              attemptId: 'attempt-2',
              userId: 'user-2',
              idempotencyKey: 'key-2',
            ),
          ),
          throwsA(
            isA<LessonCompletionUniquenessException>().having(
              (error) => error.conflict,
              'conflict',
              LessonCompletionUniqueness.completionId,
            ),
          ),
        );
        expect(
          (await repository.findByIdempotencyKey('key-1'))?.attemptId,
          _attemptId,
        );
      },
    );
  });

  group('completion integration', () {
    test(
      'corrupted exercise attempt storage propagates through the completion service instead of invalid_attempt',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey:
              '{not-valid-json',
        });
        final completionService = LocalLessonCompletionService(
          attempts: SharedPreferencesExerciseAttemptRepository(),
          completions: SharedPreferencesLessonCompletionRepository(),
          eligibility: _Eligibility(true),
          clock: _Clock(),
          ids: _Ids(),
        );

        await expectLater(
          completionService.complete(request()),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'two different attempts in the same scope racing across service instances yield exactly one recorded and one already_completed result',
      () async {
        final repositoryOne = SharedPreferencesLessonCompletionRepository();
        final repositoryTwo = SharedPreferencesLessonCompletionRepository();
        final serviceOne = service(
          attempts: [attempt(attemptId: 'race-attempt-1')],
          completions: repositoryOne,
          ids: _Ids('race-first'),
        );
        final serviceTwo = service(
          attempts: [attempt(attemptId: 'race-attempt-2')],
          completions: repositoryTwo,
          ids: _Ids('race-second'),
        );

        final results = await Future.wait([
          serviceOne.complete(
            request(attemptId: 'race-attempt-1', idempotencyKey: 'race-key-1'),
          ),
          serviceTwo.complete(
            request(attemptId: 'race-attempt-2', idempotencyKey: 'race-key-2'),
          ),
        ]);

        expect(results.map((result) => result.status).toSet(), {
          LessonCompletionStatus.recorded,
          LessonCompletionStatus.alreadyCompleted,
        });

        final recordedResults = results
            .where((result) => result.status == LessonCompletionStatus.recorded)
            .toList();
        final alreadyCompletedResults = results
            .where(
              (result) =>
                  result.status == LessonCompletionStatus.alreadyCompleted,
            )
            .toList();
        expect(recordedResults, hasLength(1));
        expect(alreadyCompletedResults, hasLength(1));

        final recorded = recordedResults.single;
        final alreadyCompleted = alreadyCompletedResults.single;
        expect(recorded.record, isNotNull);
        expect(alreadyCompleted.existingCompletionId, isNotNull);
        expect(
          recorded.record!.completionId,
          alreadyCompleted.existingCompletionId,
        );
        expect(
          ['race-attempt-1', 'race-attempt-2'],
          contains(recorded.record!.attemptId),
        );

        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesLessonCompletionRepository.storageKey,
        );
        final storedList = jsonDecode(raw!) as List;
        expect(storedList, hasLength(1));

        final storedRecord = LessonCompletionRecord.fromJson(
          Map<String, dynamic>.from(storedList.single as Map),
        );
        expect(storedRecord.completionId, recorded.record!.completionId);
        expect(storedRecord.attemptId, recorded.record!.attemptId);
        expect(storedRecord.userId, _userId);
        expect(storedRecord.userTrackId, _trackId);
        expect(storedRecord.lessonId, _lessonId);
      },
    );
  });
}
