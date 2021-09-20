import { PrismaClient } from "@prisma/client";
import { Command, CommandConfig } from "../../handlers/commands-types";

export abstract class AbstractCommand {
  protected readonly prisma: PrismaClient = new PrismaClient();
  protected config!: CommandConfig;
  constructor() {}

  public getConfig(): CommandConfig {
    return this.config;
  }
}
