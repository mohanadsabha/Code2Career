import { NextFunction, Request, Response } from "express";
import AppError from "../shared/error.type";
import { HttpErrorStatus } from "../shared/http.status";
import { promisify } from "node:util";
import { verify } from "jsonwebtoken";
import { Role } from "../users/util/user.schema";
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token
  const fullToken = req.headers.authorization;
  let token;
  if (fullToken && fullToken.startsWith("Bearer")) {
    token = fullToken.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError(
        "You are not logged in, please log in",
        HttpErrorStatus.Unauthorized
      )
    );
  }
  // Verify the token
  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);
  // Give access
  req.user = decoded.id;
  next();
};

export const restrictTo =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to perform this action",
          HttpErrorStatus.Forbidden
        )
      );
    }
    next();
  };
