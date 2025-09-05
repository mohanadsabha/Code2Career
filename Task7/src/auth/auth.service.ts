import { userService } from "../users/user.service";

export class AuthService {
  private _userService = userService;
  public async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
    // hash password
    const hashedValue = await createArgonHash(payload.password);
    // save user data in db
    const userData = this._userService.createUser(
      payload.name,
      payload.email,
      hashedValue,
      payload.avatar
    );

    return removeFields(userData, ["password"]);
  }
  public async login(payload: LoginDTO): Promise<LoginResponseDTO | null> {
    // find email
    const foundUser = this._userService.findByEmail(payload.email);
    // if no email => return error
    if (!foundUser) return null;

    const isPasswordMatch = await verifyArgonHash(
      payload.password,
      foundUser.password
    );
    // match payload password with hashed password
    if (!isPasswordMatch) return null;

    return removeFields(foundUser, ["password"]);
  }
}

export const authService = new AuthService();
