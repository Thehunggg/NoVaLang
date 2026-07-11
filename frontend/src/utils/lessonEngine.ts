import type { Course, Exercise, Lesson, MicroLesson, PlacementResult } from "../types/index";
import { normalizeAnswer } from "../../../shared/answerNormalize";

export const flattenLessons = (course?: Course): Lesson[] => course?.levels.flatMap((level) => level.units.flatMap((unit) => unit.lessons)) ?? [];

export const unlockNextLesson = (course: Course, lessonId: string): string | null => {
  const lessons = flattenLessons(course);
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  return index >= 0 ? lessons[index + 1]?.id ?? null : null;
};

export const unlockNextMicroLesson = (lesson: Lesson, microLessonId: string): string | null => {
  const index = lesson.microLessons.findIndex((micro) => micro.id === microLessonId);
  return index >= 0 ? lesson.microLessons[index + 1]?.id ?? null : null;
};

export const isLessonCompletedFromMicroLessons = (lesson: Lesson, completedMicroLessonIds: string[]): boolean =>
  lesson.microLessons.every((micro) => completedMicroLessonIds.includes(micro.id));

export const unlockStartingPointFromPlacement = (course: Course, result: PlacementResult) => {
  const lessons = flattenLessons(course);
  const startIndex = Math.max(0, lessons.findIndex((lesson) => lesson.id === result.startingLessonId));
  return { placedLessonIds: lessons.slice(0, startIndex).map((lesson) => lesson.id), unlockedLessonId: lessons[startIndex]?.id ?? lessons[0]?.id, currentUnitId: lessons[startIndex]?.unitId ?? null };
};

export { normalizeAnswer };
export const isCorrectAnswer = (exercise: Exercise, answer: string | string[]): boolean => {
  const opts = {
    caseInsensitive: exercise.caseInsensitive === true,
    ignorePunctuation: exercise.ignorePunctuation === true,
    allowedScript: exercise.allowedScript ?? ("any" as const),
  };
  if (Array.isArray(exercise.correctAnswer)) {
    const candidate = Array.isArray(answer) ? answer : [answer];
    return exercise.correctAnswer.every((item) => candidate.includes(item));
  }
  return normalizeAnswer(Array.isArray(answer) ? answer.join(" ") : answer, opts) === normalizeAnswer(exercise.correctAnswer, opts);
};

export const firstIncompleteMicroLesson = (lesson: Lesson, completedIds: string[]): MicroLesson | undefined =>
  lesson.microLessons.find((micro) => !completedIds.includes(micro.id));
