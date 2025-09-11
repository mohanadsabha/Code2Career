import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware";
import { courseController } from "./course.controller";
import { uploadCourseImage } from "../middlewares/upload.middleware";

const router = Router();

router.get("/:id", courseController.getCourse);
router.get("/", courseController.getCourses);

router.use(isAuthenticated, restrictTo("ADMIN", "COACH"));
router.post("/", uploadCourseImage.single("image"), courseController.addCourse);
router
  .route("/:id")
  .put(
    courseController.checkOwnerShip,
    uploadCourseImage.single("image"),
    courseController.updateCourse
  )
  .delete(courseController.checkOwnerShip, courseController.deleteCourse);
export const userRouter = router;
