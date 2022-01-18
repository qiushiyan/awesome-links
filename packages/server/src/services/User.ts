import { PrismaClient } from "../generated/client";

export default class UserService {
  static prisma: PrismaClient;
  // constructor(readonly prisma: PrismaClient) {
  //   this.prisma = new PrismaClient();
  // }

  static async allUsers() {
    return await this.prisma.user.findMany();
  }
}
