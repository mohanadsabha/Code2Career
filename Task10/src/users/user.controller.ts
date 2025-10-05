import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import AppError from "../shared/error.type";
import { HttpErrorStatus } from "../shared/http.status";

export class UserController {
  private userService = userService;

  setUserIdOnReq = (req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.user.id.toString();
    next();
  };

  getUser = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUser(req.params.id);
      if (!user) {
        return next(new AppError("User not found", HttpErrorStatus.NotFound));
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  createCoach = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.createCoach(name, email, password);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id)
        return next(new AppError("ID required", HttpErrorStatus.BadRequest));

      const { name, email } = req.body;

      const user = await this.userService.updateUser(id, name, email);
      if (!user) {
        return next(new AppError("User not found", HttpErrorStatus.NotFound));
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();
