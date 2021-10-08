import { PrismaClient, Guild } from "@prisma/client";
import { Message } from "discord.js";
import { Database } from "$utils/database";
import type { CommandConfig } from "$types/commands";

export abstract class AbstractCommand {
  protected prisma: PrismaClient;
  protected config!: CommandConfig;

  constructor(database: Database) {
    this.prisma = database.getDB();
  }

  public getConfig(): CommandConfig {
    return this.config;
  }

  protected async getServerConfig(
    message: Message
  ): Promise<Guild | undefined> {
    try {
      const guild = await this.prisma.guild.findUnique({
        where: {
          guildId: message.guild?.id,
        },
        include: {
          guildConfig: true,
        },
      });

      if (!guild) {
        return undefined;
      }
      return guild;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
}
