import { NextFunction, Request, Response } from "express";
import { courseService } from "./course.service";
import AppError from "../shared/error.type";
import { HttpErrorStatus } from "../shared/http.status";

class CourseController {
  private courseService = courseService;

  public async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await this.courseService.getCourses();
      res.status(200).json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getCourse(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const course = await this.courseService.getCourse(Number(req.params.id));
      if (!course) {
        return next(new AppError("Course not found", HttpErrorStatus.NotFound));
      }
      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  public async addCourse(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.title || !req.body.description) {
        return next(
          new AppError(
            "Title and Description are required",
            HttpErrorStatus.BadRequest
          )
        );
      }
      const { title, description } = req.body;
      let image: string | null | undefined = req.file?.filename;
      if (!image) image = null;

      const course = await this.courseService.addCourse(
        title,
        description,
        req.user.id,
        image
      );

      res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateCourse(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      if (!id)
        return next(new AppError("ID required", HttpErrorStatus.BadRequest));

      const { title, description } = req.body;
      const image = req.file?.filename;

      const course = await this.courseService.updateCourse(
        id,
        title,
        description,
        image
      );

      if (!course) {
        return next(new AppError("Course not found", HttpErrorStatus.NotFound));
      }

      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteCourse(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.params.id)
        return next(new AppError("ID required", HttpErrorStatus.BadRequest));

      const result = await this.courseService.deleteCourse(
        Number(req.params.id)
      );
      res.status(200).json({
        success: result,
      });
    } catch (error) {
      next(error);
    }
  }
  public async checkOwnerShip(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    if (req.user.role === "ADMIN") return next();
    const course = await this.courseService.getCourse(Number(req.params.id));
    if (!course) {
      return next(new AppError("Course not found", HttpErrorStatus.NotFound));
    }
    if (course.ownerId !== req.user.id) {
      return next(
        new AppError("You are not the owner", HttpErrorStatus.Forbidden)
      );
    }
    next();
  }
}

export const courseController = new CourseController();
