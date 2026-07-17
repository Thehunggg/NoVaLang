import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/five_card_practice.dart';
import 'package:novalang_flutter/services/exercise_attempt_repository.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _userId = 'user-1';
const _trackId = 'daily_life';
const _lessonId = 'ja-daily_life-m01-u1-l1';
const _entryKey = '$_userId|$_trackId|$_lessonId';
const _legacyEntryKey = '$_userId|$_lessonId';
const _corruptedRaw = '{not-valid-json';

ExerciseAttemptSnapshot snapshot({
  String userId = _userId,
  String userTrackId = _trackId,
  String lessonId = _lessonId,
  String attemptId = 'attempt-1',
  bool isCompleted = false,
}) => ExerciseAttemptSnapshot(
  userId: userId,
  userTrackId: userTrackId,
  attemptId: attemptId,
  lessonId: lessonId,
  currentExerciseIndex: 8,
  orderByExercise: const {
    'practice-9:options': ['choice-b', 'choice-a'],
  },
  results: const {'practice-8': true},
  answers: const {
    'practice-8': {'selectedId': 'choice-a'},
    'practice-9': {'draftAnswer': 'a draft answer'},
  },
  subIndex: 2,
  subResults: const [true, false, true],
  checked: false,
  aiGrade: const {
    'passed': false,
    'score': 2,
    'missing': [1, 3],
  },
  startedAt: '2026-07-14T10:00:00Z',
  lastUpdatedAt: '2026-07-14T10:05:00Z',
  isCompleted: isCompleted,
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  test(
    'snapshot round trip preserves user track, draft, and shuffle state',
    () {
      final restored = ExerciseAttemptSnapshot.fromJson(snapshot().toJson());

      expect(restored.userTrackId, _trackId);
      expect(restored.attemptId, 'attempt-1');
      expect(restored.currentExerciseIndex, 8);
      expect(restored.answers['practice-9']?['draftAnswer'], 'a draft answer');
      expect(
        PracticeAttempt.restore(
          restored.orderByExercise,
        ).orderFor('practice-9:options'),
        ['choice-b', 'choice-a'],
      );
    },
  );

  test('legacy snapshot without userTrackId is rejected explicitly', () {
    final legacy = snapshot().toJson()..remove('userTrackId');

    expect(
      () => ExerciseAttemptSnapshot.fromJson(legacy),
      throwsA(
        isA<FormatException>().having(
          (error) => error.message,
          'message',
          contains('without userTrackId'),
        ),
      ),
    );
  });

  test('completed snapshot is not active after repository restart', () async {
    final firstRepository = SharedPreferencesExerciseAttemptRepository();
    await firstRepository.save(snapshot(isCompleted: true));

    final restartedRepository = SharedPreferencesExerciseAttemptRepository();
    expect(
      await restartedRepository.active(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      ),
      isNull,
    );
  });

  test(
    'legacy two-part key without userTrackId migrates on scoped active read',
    () async {
      final legacy = snapshot(attemptId: 'legacy-attempt').toJson()
        ..remove('userTrackId');
      SharedPreferences.setMockInitialValues({
        SharedPreferencesExerciseAttemptRepository.storageKey: jsonEncode({
          _legacyEntryKey: legacy,
        }),
      });

      final migrated = await SharedPreferencesExerciseAttemptRepository()
          .active(userId: _userId, userTrackId: _trackId, lessonId: _lessonId);

      expect(migrated?.attemptId, 'legacy-attempt');
      expect(migrated?.userTrackId, _trackId);
      final restarted = await SharedPreferencesExerciseAttemptRepository()
          .active(userId: _userId, userTrackId: _trackId, lessonId: _lessonId);
      expect(restarted?.attemptId, 'legacy-attempt');
      final raw = (await SharedPreferences.getInstance()).getString(
        SharedPreferencesExerciseAttemptRepository.storageKey,
      )!;
      final stored = Map<String, dynamic>.from(jsonDecode(raw) as Map);
      expect(stored, contains(_entryKey));
      expect(stored, isNot(contains(_legacyEntryKey)));
    },
  );

  test(
    'repository persists and restores the full attempt after restart',
    () async {
      final original = snapshot();
      await SharedPreferencesExerciseAttemptRepository().save(original);

      final restored = await SharedPreferencesExerciseAttemptRepository()
          .active(userId: _userId, userTrackId: _trackId, lessonId: _lessonId);

      expect(restored?.toJson(), original.toJson());
    },
  );

  test('repository identity isolates user, user track, and lesson', () async {
    final repository = SharedPreferencesExerciseAttemptRepository();
    await repository.save(snapshot(attemptId: 'base'));
    await repository.save(snapshot(userId: 'user-2', attemptId: 'other-user'));
    await repository.save(
      snapshot(userTrackId: 'business', attemptId: 'other-track'),
    );
    await repository.save(
      snapshot(lessonId: 'ja-daily_life-m01-u1-l2', attemptId: 'other-lesson'),
    );

    Future<String?> activeId({
      String userId = _userId,
      String userTrackId = _trackId,
      String lessonId = _lessonId,
    }) async => (await repository.active(
      userId: userId,
      userTrackId: userTrackId,
      lessonId: lessonId,
    ))?.attemptId;

    expect(await activeId(), 'base');
    expect(await activeId(userId: 'user-2'), 'other-user');
    expect(await activeId(userTrackId: 'business'), 'other-track');
    expect(await activeId(lessonId: 'ja-daily_life-m01-u1-l2'), 'other-lesson');
  });

  test('complete targets only the matching user track identity', () async {
    final repository = SharedPreferencesExerciseAttemptRepository();
    await repository.save(snapshot(attemptId: 'daily'));
    await repository.save(
      snapshot(userTrackId: 'business', attemptId: 'business'),
    );

    await repository.complete(
      userId: _userId,
      userTrackId: _trackId,
      lessonId: _lessonId,
    );

    expect(
      await repository.active(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      ),
      isNull,
    );
    expect(
      (await repository.active(
        userId: _userId,
        userTrackId: 'business',
        lessonId: _lessonId,
      ))?.attemptId,
      'business',
    );
  });

  group('corrupted storage', () {
    test(
      'invalid JSON storage — active() throws a storage exception',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: _corruptedRaw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'invalid JSON storage — findByAttemptId() throws a storage exception',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: _corruptedRaw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().findByAttemptId(
            'attempt-1',
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'invalid JSON storage — save() throws and leaves the raw value unchanged',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: _corruptedRaw,
        });
        final repository = SharedPreferencesExerciseAttemptRepository();

        await expectLater(
          repository.save(snapshot()),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesExerciseAttemptRepository.storageKey,
          ),
          _corruptedRaw,
        );
      },
    );

    test(
      'invalid JSON storage — complete() throws and leaves the raw value unchanged',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: _corruptedRaw,
        });
        final repository = SharedPreferencesExerciseAttemptRepository();

        await expectLater(
          repository.complete(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesExerciseAttemptRepository.storageKey,
          ),
          _corruptedRaw,
        );
      },
    );

    test('storage root that is not a map throws a storage exception', () async {
      final raw = jsonEncode([1, 2, 3]);
      SharedPreferences.setMockInitialValues({
        SharedPreferencesExerciseAttemptRepository.storageKey: raw,
      });

      await expectLater(
        SharedPreferencesExerciseAttemptRepository().active(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        ),
        throwsA(isA<ExerciseAttemptStorageException>()),
      );
      expect(
        (await SharedPreferences.getInstance()).getString(
          SharedPreferencesExerciseAttemptRepository.storageKey,
        ),
        raw,
      );
    });

    test(
      'stored snapshot missing userTrackId throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()..remove('userTrackId');
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesExerciseAttemptRepository.storageKey,
          ),
          raw,
        );
      },
    );

    test('stored snapshot missing userId throws a storage exception', () async {
      final corrupted = snapshot().toJson()..remove('userId');
      final raw = jsonEncode({_entryKey: corrupted});
      SharedPreferences.setMockInitialValues({
        SharedPreferencesExerciseAttemptRepository.storageKey: raw,
      });

      await expectLater(
        SharedPreferencesExerciseAttemptRepository().findByAttemptId(
          'attempt-1',
        ),
        throwsA(isA<ExerciseAttemptStorageException>()),
      );
    });

    test(
      'stored snapshot missing attemptId throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()..remove('attemptId');
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().findByAttemptId(
            'attempt-1',
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'stored snapshot missing lessonId throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()..remove('lessonId');
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test('empty or whitespace identity fields are rejected', () {
      const fields = [
        'userId',
        'attemptId',
        'userTrackId',
        'lessonId',
        'startedAt',
        'lastUpdatedAt',
      ];
      for (final field in fields) {
        for (final value in ['', '  ']) {
          final invalid = snapshot().toJson()..[field] = value;
          expect(
            () => ExerciseAttemptSnapshot.fromJson(invalid),
            throwsA(isA<FormatException>()),
            reason: '$field = "$value" must be rejected',
          );
        }
      }
    });

    test(
      'orderByExercise with a non-string element throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()
          ..['orderByExercise'] = {
            'exercise-1': ['a', 123, true],
          };
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'orderByExercise value that is not a list throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()
          ..['orderByExercise'] = {'exercise-1': 'not-a-list'};
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'results with a non-boolean value throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()
          ..['results'] = {'exercise-1': 'true'};
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'subResults with a non-boolean element throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()
          ..['subResults'] = [true, 'false', 1];
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test(
      'answers with a value that is not a map throws a storage exception',
      () async {
        final corrupted = snapshot().toJson()
          ..['answers'] = {'exercise-1': 'not-a-map'};
        final raw = jsonEncode({_entryKey: corrupted});
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: raw,
        });

        await expectLater(
          SharedPreferencesExerciseAttemptRepository().active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );
      },
    );

    test('aiGrade that is not a map throws a storage exception', () async {
      final corrupted = snapshot().toJson()..['aiGrade'] = 'not-a-map';
      final raw = jsonEncode({_entryKey: corrupted});
      SharedPreferences.setMockInitialValues({
        SharedPreferencesExerciseAttemptRepository.storageKey: raw,
      });

      await expectLater(
        SharedPreferencesExerciseAttemptRepository().active(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        ),
        throwsA(isA<ExerciseAttemptStorageException>()),
      );
    });

    test('stored entry that is not a map throws a storage exception', () async {
      final raw = jsonEncode({_entryKey: 'not-a-snapshot'});
      SharedPreferences.setMockInitialValues({
        SharedPreferencesExerciseAttemptRepository.storageKey: raw,
      });

      await expectLater(
        SharedPreferencesExerciseAttemptRepository().active(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        ),
        throwsA(isA<ExerciseAttemptStorageException>()),
      );
      expect(
        (await SharedPreferences.getInstance()).getString(
          SharedPreferencesExerciseAttemptRepository.storageKey,
        ),
        raw,
      );
    });
  });

  group('repository concurrency', () {
    test(
      'two repository instances saving different identities concurrently both persist',
      () async {
        final repositoryOne = SharedPreferencesExerciseAttemptRepository();
        final repositoryTwo = SharedPreferencesExerciseAttemptRepository();

        await Future.wait([
          repositoryOne.save(
            snapshot(attemptId: 'attempt-a', userId: 'user-a'),
          ),
          repositoryTwo.save(
            snapshot(attemptId: 'attempt-b', userId: 'user-b'),
          ),
        ]);

        final reader = SharedPreferencesExerciseAttemptRepository();
        expect(
          (await reader.active(
            userId: 'user-a',
            userTrackId: _trackId,
            lessonId: _lessonId,
          ))?.attemptId,
          'attempt-a',
        );
        expect(
          (await reader.active(
            userId: 'user-b',
            userTrackId: _trackId,
            lessonId: _lessonId,
          ))?.attemptId,
          'attempt-b',
        );
      },
    );

    test(
      'concurrent saves for the same identity converge without losing unrelated entries',
      () async {
        final seed = SharedPreferencesExerciseAttemptRepository();
        await seed.save(
          snapshot(attemptId: 'other-user', userId: 'user-other'),
        );

        final repositoryOne = SharedPreferencesExerciseAttemptRepository();
        final repositoryTwo = SharedPreferencesExerciseAttemptRepository();

        await Future.wait([
          repositoryOne.save(snapshot(attemptId: 'race-1')),
          repositoryTwo.save(snapshot(attemptId: 'race-2')),
        ]);

        final reader = SharedPreferencesExerciseAttemptRepository();
        final finalAttempt = await reader.active(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        );
        expect(['race-1', 'race-2'], contains(finalAttempt?.attemptId));
        expect(
          (await reader.active(
            userId: 'user-other',
            userTrackId: _trackId,
            lessonId: _lessonId,
          ))?.attemptId,
          'other-user',
        );
      },
    );

    test(
      'save() and complete() running concurrently do not lose an unrelated attempt',
      () async {
        final seed = SharedPreferencesExerciseAttemptRepository();
        await seed.save(snapshot(attemptId: 'to-complete'));
        await seed.save(
          snapshot(attemptId: 'unrelated', userTrackId: 'business'),
        );

        final repositoryOne = SharedPreferencesExerciseAttemptRepository();
        final repositoryTwo = SharedPreferencesExerciseAttemptRepository();

        await Future.wait([
          repositoryOne.complete(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          repositoryTwo.save(
            snapshot(attemptId: 'unrelated-updated', userTrackId: 'business'),
          ),
        ]);

        final reader = SharedPreferencesExerciseAttemptRepository();
        expect(
          await reader.active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ),
          isNull,
        );
        expect(
          (await reader.active(
            userId: _userId,
            userTrackId: 'business',
            lessonId: _lessonId,
          ))?.attemptId,
          'unrelated-updated',
        );
      },
    );

    test(
      'queue continues after a save() throws due to corrupted storage',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesExerciseAttemptRepository.storageKey: _corruptedRaw,
        });
        final repository = SharedPreferencesExerciseAttemptRepository();

        await expectLater(
          repository.save(snapshot(attemptId: 'blocked-by-corruption')),
          throwsA(isA<ExerciseAttemptStorageException>()),
        );

        await (await SharedPreferences.getInstance()).remove(
          SharedPreferencesExerciseAttemptRepository.storageKey,
        );

        await expectLater(
          repository.save(snapshot(attemptId: 'after-recovery')),
          completes,
        );
        expect(
          (await repository.active(
            userId: _userId,
            userTrackId: _trackId,
            lessonId: _lessonId,
          ))?.attemptId,
          'after-recovery',
        );
      },
    );

    test('findByAttemptId returns completed attempts after restart', () async {
      final writer = SharedPreferencesExerciseAttemptRepository();
      await writer.save(snapshot(attemptId: 'attempt-restart'));
      await writer.complete(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );

      expect(
        await writer.active(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        ),
        isNull,
      );

      final reader = SharedPreferencesExerciseAttemptRepository();
      final restored = await reader.findByAttemptId('attempt-restart');
      expect(restored, isNotNull);
      expect(restored!.isCompleted, isTrue);
      expect(restored.attemptId, 'attempt-restart');
      expect(restored.userId, _userId);
      expect(restored.userTrackId, _trackId);
      expect(restored.lessonId, _lessonId);
    });
  });
}
