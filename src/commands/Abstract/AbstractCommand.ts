import { PrismaClient, Guild } from "@prisma/client";
import { Message } from "discord.js";
import { Database } from "../../database";
import { CommandConfig } from "../../handlers/commands-types";

export abstract class AbstractCommand {
  protected prisma: PrismaClient;
  protected config!: CommandConfig;

  constructor(database: Database) {
    this.prisma = database.getDB();
  }

  public getConfig(): CommandConfig {
    return this.config;
  }

  protected async getServerConfig(message: Message): Promise<Guild | boolean> {
    try {
      const guild = await this.prisma.guild.findUnique({
        where: {
          guildId: message.guild?.id,
        },
      });

      if (!guild) {
        return false;
      }

      return guild;
      // return this.prisma.guildConfig.findUnique({
      //   where: {
      //     guildId: guild
      //   }
      // })
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
