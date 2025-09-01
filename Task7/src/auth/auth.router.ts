import { RequestHandler, Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login");

router.post("/register");

export const authRouter = router;
