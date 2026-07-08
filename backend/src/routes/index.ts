import { Router } from "express";
import { healthRouter } from "./health.js";
import { languagesRouter } from "./languages.js";
import { lessonsRouter } from "./lessons.js";
import { practiceRouter } from "./practice.js";
import { coursesRouter } from "./courses.js";
import { nativeLanguagesRouter } from "./nativeLanguages.js";
import { placementRouter } from "./placement.js";
import { reviewRouter } from "./review.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/languages", languagesRouter);
apiRouter.use("/native-languages", nativeLanguagesRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.use("/lessons", lessonsRouter);
apiRouter.use("/lesson", lessonsRouter);
apiRouter.use("/placement", placementRouter);
apiRouter.use("/review", reviewRouter);
apiRouter.use("/practice", practiceRouter);
