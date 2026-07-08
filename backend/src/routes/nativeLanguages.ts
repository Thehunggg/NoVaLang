import { Router } from "express";
import { nativeLanguages } from "../data/nativeLanguages.js";

export const nativeLanguagesRouter = Router();
nativeLanguagesRouter.get("/", (_request, response) => response.json(nativeLanguages));
