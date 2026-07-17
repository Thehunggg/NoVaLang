import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/services/exercise_review_repository.dart';
import 'package:shared_preferences/shared_preferences.dart';

ExerciseReviewRecord record({
  String attemptId = 'attempt-1',
  String date = '2026-07-13',
  String userId = 'user-1',
  String lessonId = 'ja-daily_life-m01-u1-l1',
  String exerciseId = 'practice-10',
  int exerciseNumber = 10,
  String? subQuestionId,
  String userAnswer = 'こんにちは',
  bool isCorrect = false,
}) => ExerciseReviewRecord(
  attemptId: attemptId,
  userId: userId,
  localStudyDate: date,
  lessonId: lessonId,
  lessonTitle: 'Lesson 1 — Chào hỏi',
  exerciseId: exerciseId,
  exerciseNumber: exerciseNumber,
  subQuestionId: subQuestionId,
  exerciseType: 'chat_text_fill',
  questionDisplay: 'Hoàn thành đoạn chat',
  userAnswer: userAnswer,
  correctAnswer: 'こんにちは',
  isCorrect: isCorrect,
  completedAt: '2026-07-13T10:00:00',
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  test(
    'wrong answer bank upserts by stable lesson/exercise/sub-question key',
    () async {
      final repository = InMemoryExerciseReviewRepository();
      await repository.upsert(record());
      await repository.upsert(record(userAnswer: 'こんにちは'));

      final wrong = await repository.forLesson(
        userId: 'user-1',
        lessonId: 'ja-daily_life-m01-u1-l1',
      );
      expect(wrong, hasLength(1));
      expect(wrong.single.userAnswer, 'こんにちは');
      await repository.resolve(wrong.single);
      expect(
        await repository.forLesson(
          userId: 'user-1',
          lessonId: 'ja-daily_life-m01-u1-l1',
        ),
        isEmpty,
      );
    },
  );

  test(
    'review records preserve raw Unicode chat input and Q9 sub-question IDs',
    () {
      final chat = record(userAnswer: 'こんにちは\nよろしくお願いします');
      final checkpoint = ExerciseReviewRecord(
        attemptId: 'attempt-2',
        userId: 'user-1',
        localStudyDate: '2026-07-13',
        lessonId: 'ja-daily_life-m01-u1-l1',
        lessonTitle: 'Lesson 1 — Chào hỏi',
        exerciseId: 'practice-9',
        exerciseNumber: 9,
        subQuestionId: 'q9_1',
        exerciseType: 'checkpoint',
        questionDisplay: 'Khi nào?',
        userAnswer: 'Buổi sáng',
        correctAnswer: 'Buổi sáng',
        isCorrect: true,
        completedAt: '2026-07-13T10:01:00',
      );
      expect(chat.userAnswer, 'こんにちは\nよろしくお願いします');
      expect(checkpoint.subQuestionId, 'q9_1');
    },
  );

  test(
    'shared-preferences review records upsert stable keys, isolate scopes, and survive restart',
    () async {
      final firstRepository = SharedPreferencesExerciseReviewRepository();
      await firstRepository.upsert(
        record(
          attemptId: 'resumable-attempt',
          exerciseId: 'practice-9',
          exerciseNumber: 9,
          subQuestionId: 'q9_1',
          userAnswer: 'first answer',
        ),
      );
      await firstRepository.upsert(
        record(
          attemptId: 'resumable-attempt',
          exerciseId: 'practice-9',
          exerciseNumber: 9,
          subQuestionId: 'q9_1',
          userAnswer: 'updated answer',
        ),
      );
      await firstRepository.upsert(
        record(
          attemptId: 'resumable-attempt',
          exerciseId: 'practice-9',
          exerciseNumber: 9,
          subQuestionId: 'q9_2',
          userAnswer: 'separate sub-question',
        ),
      );
      await firstRepository.upsert(
        record(
          userId: 'user-2',
          exerciseId: 'practice-9',
          exerciseNumber: 9,
          subQuestionId: 'q9_1',
          userAnswer: 'other user',
        ),
      );
      await firstRepository.upsert(
        record(
          lessonId: 'ja-daily_life-m01-u1-l2',
          exerciseId: 'practice-9',
          exerciseNumber: 9,
          subQuestionId: 'q9_1',
          userAnswer: 'other lesson',
        ),
      );

      final restartedRepository = SharedPreferencesExerciseReviewRepository();
      final primaryRecords = await restartedRepository.forLesson(
        userId: 'user-1',
        lessonId: 'ja-daily_life-m01-u1-l1',
      );
      expect(primaryRecords, hasLength(2));
      expect(
        primaryRecords
            .singleWhere((item) => item.subQuestionId == 'q9_1')
            .userAnswer,
        'updated answer',
      );
      expect(
        primaryRecords
            .singleWhere((item) => item.subQuestionId == 'q9_2')
            .userAnswer,
        'separate sub-question',
      );

      final otherUserRecords = await restartedRepository.forLesson(
        userId: 'user-2',
        lessonId: 'ja-daily_life-m01-u1-l1',
      );
      expect(otherUserRecords, hasLength(1));
      expect(otherUserRecords.single.userAnswer, 'other user');

      final otherLessonRecords = await restartedRepository.forLesson(
        userId: 'user-1',
        lessonId: 'ja-daily_life-m01-u1-l2',
      );
      expect(otherLessonRecords, hasLength(1));
      expect(otherLessonRecords.single.userAnswer, 'other lesson');
    },
  );
}
