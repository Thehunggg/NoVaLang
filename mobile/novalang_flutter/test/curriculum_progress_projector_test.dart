import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/canonical_event.dart';
import 'package:novalang_flutter/models/curriculum_progress_projection.dart';
import 'package:novalang_flutter/repositories/curriculum_progress_repository.dart';
import 'package:novalang_flutter/services/curriculum_progress_projector.dart';
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
  DateTime? occurredAt,
}) => CanonicalEvent.create(
  eventId: eventId,
  eventType: CanonicalEventType.lessonCompletionRecorded,
  sourceRecordId: sourceRecordId,
  sourceRecordType: 'lesson_completion',
  userId: userId,
  userTrackId: userTrackId,
  lessonId: lessonId,
  occurredAt: occurredAt ?? DateTime.utc(2026, 7, 14, 10, 1),
  idempotencyKey: 'event:$sourceRecordId',
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  group('curriculum progress projector', () {
    test('first event creates a completed projection', () async {
      final repository = SharedPreferencesCurriculumProgressRepository();
      final projector = CurriculumProgressProjector(repository: repository);

      await projector.handle(event());

      final projection = await repository.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );
      expect(projection, isNotNull);
      expect(projection!.isCompleted, isTrue);
      expect(projection.sourceCompletionId, 'completion-1');
      expect(projection.lastProcessedEventId, 'event-1');
      expect(projection.firstCompletedAt, DateTime.utc(2026, 7, 14, 10, 1));
    });

    test('duplicate event does not change the projection a second time', () async {
      final repository = SharedPreferencesCurriculumProgressRepository();
      final projector = CurriculumProgressProjector(repository: repository);

      await projector.handle(event());
      await projector.handle(event());
      await projector.handle(
        event(occurredAt: DateTime.utc(2026, 7, 14, 12)),
      );

      final projection = await repository.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );
      expect(projection!.firstCompletedAt, DateTime.utc(2026, 7, 14, 10, 1));

      final all = await repository.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(all, hasLength(1));
    });

    test('user isolation: different user gets its own projection', () async {
      final repository = SharedPreferencesCurriculumProgressRepository();
      final projector = CurriculumProgressProjector(repository: repository);

      await projector.handle(event());
      await projector.handle(
        event(
          eventId: 'event-2',
          sourceRecordId: 'completion-2',
          userId: 'user-2',
        ),
      );

      expect(
        (await repository.findProjection(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        ))?.sourceCompletionId,
        'completion-1',
      );
      expect(
        (await repository.findProjection(
          userId: 'user-2',
          userTrackId: _trackId,
          lessonId: _lessonId,
        ))?.sourceCompletionId,
        'completion-2',
      );
    });

    test('track isolation: different track gets its own projection', () async {
      final repository = SharedPreferencesCurriculumProgressRepository();
      final projector = CurriculumProgressProjector(repository: repository);

      await projector.handle(event());
      await projector.handle(
        event(
          eventId: 'event-2',
          sourceRecordId: 'completion-2',
          userTrackId: 'business',
        ),
      );

      expect(
        await repository.findProjection(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        ),
        isNotNull,
      );
      expect(
        await repository.findProjection(
          userId: _userId,
          userTrackId: 'business',
          lessonId: _lessonId,
        ),
        isNotNull,
      );
    });

    test('lesson isolation: different lesson gets its own projection', () async {
      final repository = SharedPreferencesCurriculumProgressRepository();
      final projector = CurriculumProgressProjector(repository: repository);

      await projector.handle(event());
      await projector.handle(
        event(
          eventId: 'event-2',
          sourceRecordId: 'completion-2',
          lessonId: 'ja-daily_life-m01-u1-l2',
        ),
      );

      final all = await repository.listForUserTrack(
        userId: _userId,
        userTrackId: _trackId,
      );
      expect(all.map((p) => p.lessonId).toSet(), {
        _lessonId,
        'ja-daily_life-m01-u1-l2',
      });
    });

    test('projection persists after repository restart', () async {
      await CurriculumProgressProjector(
        repository: SharedPreferencesCurriculumProgressRepository(),
      ).handle(event());

      final restarted = SharedPreferencesCurriculumProgressRepository();
      final projection = await restarted.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );
      expect(projection?.sourceCompletionId, 'completion-1');
    });

    test(
      'two concurrent handle() calls for the same event create exactly one projection',
      () async {
        final repositoryOne = SharedPreferencesCurriculumProgressRepository();
        final repositoryTwo = SharedPreferencesCurriculumProgressRepository();
        final projectorOne = CurriculumProgressProjector(repository: repositoryOne);
        final projectorTwo = CurriculumProgressProjector(repository: repositoryTwo);

        await Future.wait([
          projectorOne.handle(event()),
          projectorTwo.handle(event()),
        ]);

        final all = await repositoryOne.listForUserTrack(
          userId: _userId,
          userTrackId: _trackId,
        );
        expect(all, hasLength(1));
      },
    );

    test(
      'corrupted storage throws instead of silently treating projections as absent',
      () async {
        SharedPreferences.setMockInitialValues({
          SharedPreferencesCurriculumProgressRepository.storageKey:
              '{not-valid-json',
        });
        final repository = SharedPreferencesCurriculumProgressRepository();
        final projector = CurriculumProgressProjector(repository: repository);

        await expectLater(
          projector.handle(event()),
          throwsA(isA<CurriculumProgressStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesCurriculumProgressRepository.storageKey,
          ),
          '{not-valid-json',
        );
      },
    );

    test('does not award XP, mastery, or usage side effects', () async {
      final repository = SharedPreferencesCurriculumProgressRepository();
      final projector = CurriculumProgressProjector(repository: repository);

      await projector.handle(event());

      final projection = await repository.findProjection(
        userId: _userId,
        userTrackId: _trackId,
        lessonId: _lessonId,
      );
      final fields = projection!.toJson().keys.toSet();
      expect(fields, {
        'userId',
        'userTrackId',
        'lessonId',
        'isCompleted',
        'firstCompletedAt',
        'sourceCompletionId',
        'lastProcessedEventId',
        'contractVersion',
      });
    });
  });

  group('strict progress storage validation', () {
    Map<String, dynamic> validJson({Object? isCompleted = true}) => {
      'userId': _userId,
      'userTrackId': _trackId,
      'lessonId': _lessonId,
      'isCompleted': isCompleted,
      'firstCompletedAt': '2026-07-14T10:01:00Z',
      'sourceCompletionId': 'completion-1',
      'lastProcessedEventId': 'event-1',
      'contractVersion': '1.0',
    };

    test('missing isCompleted is rejected', () {
      final json = validJson()..remove('isCompleted');
      expect(
        () => CurriculumProgressProjection.fromJson(json),
        throwsA(
          isA<FormatException>().having(
            (error) => error.message,
            'message',
            'isCompleted is required',
          ),
        ),
      );
    });

    test('string "true" is rejected', () {
      expect(
        () => CurriculumProgressProjection.fromJson(validJson(isCompleted: 'true')),
        throwsA(
          isA<FormatException>().having(
            (error) => error.message,
            'message',
            'isCompleted must be a boolean',
          ),
        ),
      );
    });

    test('number 1 is rejected', () {
      expect(
        () => CurriculumProgressProjection.fromJson(validJson(isCompleted: 1)),
        throwsA(
          isA<FormatException>().having(
            (error) => error.message,
            'message',
            'isCompleted must be a boolean',
          ),
        ),
      );
    });

    test('null isCompleted is rejected', () {
      expect(
        () => CurriculumProgressProjection.fromJson(validJson(isCompleted: null)),
        throwsA(
          isA<FormatException>().having(
            (error) => error.message,
            'message',
            'isCompleted must be a boolean',
          ),
        ),
      );
    });

    test('valid false and true are accepted', () {
      expect(
        CurriculumProgressProjection.fromJson(validJson(isCompleted: false)).isCompleted,
        isFalse,
      );
      expect(
        CurriculumProgressProjection.fromJson(validJson(isCompleted: true)).isCompleted,
        isTrue,
      );
    });

    test('wrong types on required identity fields are rejected', () {
      for (final field in [
        'userId',
        'userTrackId',
        'lessonId',
        'sourceCompletionId',
        'lastProcessedEventId',
        'contractVersion',
      ]) {
        final json = validJson()..[field] = 42;
        expect(
          () => CurriculumProgressProjection.fromJson(json),
          throwsA(isA<FormatException>()),
          reason: field,
        );
      }
    });

    test('raw value unchanged after failed read', () async {
      const corrupted = '{"bad":true}';
      SharedPreferences.setMockInitialValues({
        SharedPreferencesCurriculumProgressRepository.storageKey: corrupted,
      });
      final repository = SharedPreferencesCurriculumProgressRepository();

      await expectLater(
        repository.findProjection(
          userId: _userId,
          userTrackId: _trackId,
          lessonId: _lessonId,
        ),
        throwsA(isA<CurriculumProgressStorageException>()),
      );
      expect(
        (await SharedPreferences.getInstance()).getString(
          SharedPreferencesCurriculumProgressRepository.storageKey,
        ),
        corrupted,
      );
    });

    test('raw value unchanged after failed save', () async {
      const corrupted = '{not-valid-json';
      SharedPreferences.setMockInitialValues({
        SharedPreferencesCurriculumProgressRepository.storageKey: corrupted,
      });
      final repository = SharedPreferencesCurriculumProgressRepository();

      await expectLater(
        repository.save(
          CurriculumProgressProjection.fromJson(validJson()),
        ),
        throwsA(isA<CurriculumProgressStorageException>()),
      );
      expect(
        (await SharedPreferences.getInstance()).getString(
          SharedPreferencesCurriculumProgressRepository.storageKey,
        ),
        corrupted,
      );
    });
  });
}
