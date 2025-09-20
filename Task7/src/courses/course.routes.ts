import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware";
import { courseController } from "./course.controller";
import { uploadCourseImage } from "../middlewares/upload.middleware";

const router = Router();

router.get("/:id", courseController.getCourse.bind(courseController));
router.get("/", courseController.getCourses.bind(courseController));

router.use(isAuthenticated, restrictTo("ADMIN", "COACH"));
router.post(
  "/",
  uploadCourseImage.single("image"),
  courseController.addCourse.bind(courseController)
);
router
  .route("/:id")
  .put(
    courseController.checkOwnerShip,
    uploadCourseImage.single("image"),
    courseController.updateCourse.bind(courseController)
  )
  .delete(
    courseController.checkOwnerShip,
    courseController.deleteCourse.bind(courseController)
  );
export const courseRouter = router;
