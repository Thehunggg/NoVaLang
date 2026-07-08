import { Router } from "express";
import { languages } from "../data/mockData.js";

export const languagesRouter = Router();

languagesRouter.get("/", (_request, response) => {
  response.json(languages);
});
