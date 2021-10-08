import { Guild as GuildSchema, PrismaClient } from ".prisma/client";
import { Guild } from "discord.js";

export class guildHandler {
  constructor(
    private readonly _guild: Guild,
    private readonly prisma: PrismaClient
  ) {}

  public async createConfig(): Promise<void> {
    try {
      await this.prisma.guild.create({
        data: {
          guildId: this._guild.id,
          name: this._guild.name,
          guildConfig: {
            create: {
              prefix: "!",
              lang: "en-US",
            },
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  public async configExists(): Promise<boolean> {
    try {
      const GUILD = await this.prisma.guild.findUnique({
        where: { guildId: this._guild.id },
      });

      if (!GUILD) {
        return false;
      }
      const CONFIG = await this.prisma.guildConfig.findUnique({
        where: {
          guildId: GUILD.id, //PPNNG / Postgres Prisma NestJS NextJS Graphql
        },
      });
      return !!CONFIG;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async deleteConfig(): Promise<void> {
    try {
      const GUILD = await this.prisma.guild.findUnique({
        where: { guildId: this._guild.id },
      });
      if (GUILD) {
        await this.prisma.guildConfig.delete({
          where: { guildId: GUILD.id },
        });
        await this.prisma.guild.delete({
          where: { guildId: this._guild.id },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async getAll(): Promise<GuildSchema[]> {
    return await this.prisma.guild.findMany({
      where: {},
    });
  }
}
