import { EventListener } from "$decorators/EventListener";
import { Database } from "$utils/database";
import { GuildConfigurator } from "$utils/GuildConfigurator";
import { Client, Guild } from "discord.js";

@EventListener()
export class GuildEvents {
  private database: Database;
  private client: Client;

  constructor(client: Client, database: Database) {
    this.database = database;
    this.client = client;
  }

  public guildCreate = async (guild: Guild) => {
    const GuildHandler = new GuildConfigurator(guild, this.database.getDB());
    if (!(await GuildHandler.configExists())) {
      await GuildHandler.createConfig();
    }
  };

  public guildDelete = () => {
    this.client.on("guildDelete", async (guild) => {
      const GuildHandler = new GuildConfigurator(guild, this.database.getDB());
      await GuildHandler.deleteConfig();
    });
  };
}
