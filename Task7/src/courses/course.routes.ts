import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware";
import { courseController } from "./course.controller";

const router = Router();

router.get("/:id", courseController.getCourse);
router.get("/", courseController.getCourses);

router.use(isAuthenticated, restrictTo("ADMIN", "COACH"));
router.post("/", courseController.addCourse);
router
  .route("/:id")
  .put(courseController.checkOwnerShip, courseController.updateCourse)
  .delete(courseController.checkOwnerShip, courseController.deleteCourse);
export const userRouter = router;
