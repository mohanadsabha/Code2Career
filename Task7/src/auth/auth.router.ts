import { RequestHandler, Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  authController.login.bind(authController) as RequestHandler
);
router.post(
  "/register",
  authController.register.bind(authController) as RequestHandler
);

export const authRouter = router;
