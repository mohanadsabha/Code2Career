import { Router } from "express";
import { userController } from "./user.controller";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated);
router
  .route("/me")
  .get(userController.setUserIdOnReq, userController.getUser)
  .put(userController.setUserIdOnReq, userController.updateUser);
router.route("/coach").post(restrictTo("ADMIN"), userController.createCoach);

export const userRouter = router;
