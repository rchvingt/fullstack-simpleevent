import express from "express";
import { UserController } from "../controller/user-controller";
import { luciaValidateSession } from "../middleware/lucia-middleware";

export const apiRouter = express.Router();
apiRouter.use(luciaValidateSession);

// User APi
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);
