import { PrismaClient } from "@prisma/client";

export class Database {
  private readonly prisma: PrismaClient = new PrismaClient();

  public getDB(): PrismaClient {
    return this.prisma;
  }
}
