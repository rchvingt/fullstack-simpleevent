import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../route/public-api";
import { luciaMiddleware, luciaValidateSession } from "../middleware/lucia-middleware";
import { apiRouter } from "../route/api";
import cors from "cors";

export const web = express();

web.use(express.json());
web.use(luciaMiddleware);
// web.use(luciaValidateSession);

web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
