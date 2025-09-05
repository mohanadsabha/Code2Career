import { Request, Response, NextFunction } from "express";
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
  StringObject,
} from "./types/auth.dto";
import { authService } from "./auth.service";
import { zodValidation } from "../shared/zod.util";
import { loginDTOSchema, registerDTOSchema } from "./utils/auth.schema";
import AppError from "../shared/error.type";
import { HttpErrorStatus } from "../shared/http.status";
import { signJWT } from "./utils/jwt.util";

export class AuthController {
  private authService = authService;
  public async register(
    req: Request<StringObject, StringObject, RegisterDTO>,
    res: Response<RegisterResponseDTO | string>,
    next: NextFunction
  ) {
    const payload = zodValidation(registerDTOSchema, req.body);
    const user = await this.authService.register(payload);
    res.status(201).json({
      success: true,
      data: user,
    });
  }
  public async login(
    req: Request<StringObject, StringObject, LoginDTO>,
    res: Response<LoginResponseDTO | string>,
    next: NextFunction
  ) {
    const payload = zodValidation(loginDTOSchema, req.body);
    const user = await this.authService.login(payload);
    if (!user) {
      return next(
        new AppError("Invalid credentials", HttpErrorStatus.BadRequest)
      );
    }
    const token = signJWT({ id: user.id, name: user.name });
    res.status(200).json({
      success: true,
      data: user,
      token,
    });
  }
}

export const authController = new AuthController();
