import { Client } from "discord.js";
import { Database } from "./database";
import { guildHandler } from "$handlers/GuildConfigHandler";
import { commandHandler, parseCommands } from "$handlers/Commands";

export class eventListener {
  private CommandHandler!: commandHandler;
  constructor(private readonly client: Client, private readonly DB: Database) {}

  public async start() {
    this.client.on("ready", () => {
      console.log("Bot ready");
      const { commands, categories } = parseCommands("commands/", this.DB);
      categories.length;
      this.CommandHandler = new commandHandler(commands, this.DB);
    });

    this.client.on("guildCreate", async (guild) => {
      const GuildHandler = new guildHandler(guild, this.DB.getDB());
      if (!(await GuildHandler.configExists())) {
        await GuildHandler.createConfig();
      }
    });

    this.client.on("guildDelete", async (guild) => {
      console.log(guild.id);
      const GuildHandler = new guildHandler(guild, this.DB.getDB());
      console.log(await GuildHandler.getAll());
      await GuildHandler.deleteConfig();
      console.log(await GuildHandler.getAll());
    });

    this.client.on("messageCreate", async (message) => {
      if (message.author.bot) return;
      await this.CommandHandler.handle(message);
    });
  }
}
