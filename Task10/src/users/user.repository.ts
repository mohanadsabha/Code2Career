import { GenericRepository } from "../shared/generic.repository";
import { UserModel } from "./user.model";

class UserRepository extends GenericRepository<any> {
  constructor() {
    super(UserModel as any);
  }

  async findByEmail(email: string): Promise<any | null> {
    return await (this.model as any).findOne({ email }).lean();
  }
}

export const userRepository = new UserRepository();
