import { NextFunction, Request, Response } from "express";
import AppError from "../shared/error.type";
import { HttpErrorStatus } from "../shared/http.status";
import { Role } from "../users/utils/user.schema";
import { userService } from "../users/user.service";
import { verifyJWT } from "../auth/utils/jwt.util";
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
  // Verify the token and check if the user still exists
  const decoded = await verifyJWT(token);
  const user = userService.getUser(decoded.id);
  if (!user) {
    return next(
      new AppError(
        "The user does not longer exist.",
        HttpErrorStatus.Unauthorized
      )
    );
  }
  // Give access
  req.user = user;
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
