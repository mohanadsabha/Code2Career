import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import AppError from "../shared/error.type";
import { HttpErrorStatus } from "../shared/http.status";

export class UserController {
  private service = userService;

  setUserIdOnReq = (req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.user.id;
    next();
  };

  getUser = (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const user = this.service.getUser(req.params.id);
    if (!user) {
      return next(new AppError("User not found", HttpErrorStatus.NotFound));
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  };

  createCoach = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const user = this.service.createCoach(name, email, password);
    res.status(201).json({
      success: true,
      data: user,
    });
  };

  updateUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id)
      return next(new AppError("ID required", HttpErrorStatus.BadRequest));

    const { name, email } = req.body;

    const user = this.service.updateUser(id, name, email);
    if (!user) {
      return next(new AppError("User not found", HttpErrorStatus.NotFound));
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  };
}

export const userController = new UserController();
