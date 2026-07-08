import { Router } from "express";
import { getPlacementByLanguage, isLanguageCode } from "../data/mockData.js";
import { httpError } from "../utils/httpError.js";

export const placementRouter = Router();
placementRouter.get("/:language", (request, response, next) => {
  const { language } = request.params;
  if (!isLanguageCode(language)) return next(httpError(404, `Language '${language}' was not found.`));
  return response.json(getPlacementByLanguage(language));
});
