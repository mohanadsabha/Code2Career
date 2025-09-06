import { User } from "../users/user.entity";
import { userService } from "../users/user.service";
import { LoginDTO, RegisterDTO } from "./types/auth.dto";
import { createArgonHash, verifyArgonHash } from "./utils/argon.util";

export class AuthService {
  private _userService = userService;
  public async register(payload: RegisterDTO): Promise<Omit<User, "password">> {
    // hash password
    const hashedValue = await createArgonHash(payload.password);
    // save user data in db
    const userData = this._userService.createUser(
      payload.name,
      payload.email,
      hashedValue
    );

    return userData;
  }
  public async login(
    payload: LoginDTO
  ): Promise<Omit<User, "password"> | null> {
    const foundUser = this._userService.findByEmail(payload.email);
    if (!foundUser) return null;

    const isPasswordMatch = await verifyArgonHash(
      payload.password,
      foundUser.password
    );
    if (!isPasswordMatch) return null;

    return foundUser;
  }
}

export const authService = new AuthService();
