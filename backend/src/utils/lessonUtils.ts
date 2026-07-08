import type { Lesson } from "../types/index.js";

export const parseCompletedLessonIds = (value?: string): string[] =>
  value ? value.split(",").map((id) => decodeURIComponent(id.trim())).filter(Boolean) : [];

export const nextLesson = (lessons: Lesson[], lessonId: string): Lesson | undefined => {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  return index >= 0 ? lessons[index + 1] : undefined;
};
