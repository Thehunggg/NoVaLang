import { Router } from "express";
import { isLanguageCode, makePracticeSet } from "../data/mockData.js";
import { httpError } from "../utils/httpError.js";
import { parseCompletedLessonIds } from "../utils/lessonUtils.js";

export const practiceRouter = Router();

practiceRouter.get("/:language/:completedLessonIds", (request, response, next) => {
  const { language, completedLessonIds } = request.params;
  if (!isLanguageCode(language)) return next(httpError(404, `Language '${language}' was not found.`));
  return response.json(makePracticeSet(language, parseCompletedLessonIds(completedLessonIds)));
});

practiceRouter.get("/:language", (request, response, next) => {
  const { language } = request.params;
  if (!isLanguageCode(language)) return next(httpError(404, `Language '${language}' was not found.`));
  return response.json(makePracticeSet(language));
});
