import { userRepository } from "./user.repository";

class UserService {
  private repository = userRepository;

  async getUser(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }

  public async findByEmail(email: string): Promise<any | null> {
    return await this.repository.findByEmail(email);
  }

  public async createCoach(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    return await this.repository.create({
      name,
      email,
      password,
      role: "COACH",
    });
  }

  public async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    return await this.repository.create({
      name,
      email,
      password,
      role: "STUDENT",
    });
  }

  async updateUser(
    id: string,
    name: string,
    email: string
  ): Promise<any | null> {
    return await this.repository.update(id, { name, email });
  }

  async isUserIdExist(id: string): Promise<boolean> {
    const user = await this.repository.findById(id);
    return !!user;
  }
}

export const userService = new UserService();
