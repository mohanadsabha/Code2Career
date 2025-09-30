import { User } from "../generated/prisma";
import { GenericRepository } from "../shared/generic.repository";

class UserRepository extends GenericRepository<User> {
  constructor() {
    super("user");
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}

export const userRepository = new UserRepository();
