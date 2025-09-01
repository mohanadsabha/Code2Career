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
    res.json(user);
  };

  createCoach = (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = this.service.createCoach(name, email, password);
    res.status(201).json(user);
  };

  updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    const { name, email } = req.body;

    const user = this.service.updateUser(id, name, email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  };
}
