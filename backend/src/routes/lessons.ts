import { Router } from "express";
import { getLessonById, getLessonsByLanguage, isLanguageCode } from "../data/mockData.js";
import { httpError } from "../utils/httpError.js";

export const lessonsRouter = Router();

lessonsRouter.get("/:lessonId", (request, response, next) => {
  if (isLanguageCode(request.params.lessonId)) return response.json(getLessonsByLanguage(request.params.lessonId));
  const lesson = getLessonById(request.params.lessonId);
  if (!lesson) return next(httpError(404, `Lesson '${request.params.lessonId}' was not found.`));
  return response.json(lesson);
});
