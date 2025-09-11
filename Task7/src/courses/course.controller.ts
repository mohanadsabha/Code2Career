import { NextFunction, Request, Response } from "express";
import { courseService } from "./course.service";
import AppError from "../shared/error.type";
import { HttpErrorStatus } from "../shared/http.status";

class CourseController {
  private courseService = courseService;
  public getCourses(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      success: true,
      data: this.courseService.getCourses(),
    });
  }
  public getCourse(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const course = this.courseService.getCourse(req.params.id);
    if (!course) {
      return next(new AppError("Course not found", HttpErrorStatus.NotFound));
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  }
  public addCourse(req: Request, res: Response, next: NextFunction) {
    const { title, description } = req.body;
    // const image = req.file; implement multer
    const course = this.courseService.addCourse(
      title,
      description,
      req.user.id
    );
    res.status(201).json({
      success: true,
      data: course,
    });
  }
  public updateCourse(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    if (!id)
      return next(new AppError("ID required", HttpErrorStatus.BadRequest));

    const { title, description } = req.body;
    // const image = req.file; implement multer

    const course = this.courseService.updateCourse(id, title, description);
    if (!course) {
      return next(new AppError("Course not found", HttpErrorStatus.NotFound));
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  }

  public deleteCourse(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    if (!req.params.id)
      return next(new AppError("ID required", HttpErrorStatus.BadRequest));

    res.status(200).json({
      success: this.courseService.deleteCourse(req.params.id),
    });
  }
  public checkOwnerShip(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    if (req.user.role === "ADMIN") return next();
    const course = this.courseService.getCourse(req.params.id);
    if (!course) {
      return next(new AppError("Course not found", HttpErrorStatus.NotFound));
    }
    if (course.owner !== req.user.id) {
      return next(
        new AppError("You are not the owner", HttpErrorStatus.Forbidden)
      );
    }
    next();
  }
}

export const courseController = new CourseController();
