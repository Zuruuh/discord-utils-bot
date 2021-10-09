import { Client } from "discord.js";
import { Database } from "$utils/database";

import { BotEvents } from "$events/BotEvents";
import { GuildEvents } from "$events/GuildEvents";
import { MessageEvents } from "$events/MessageEvents";

export class RegisterEvents {
  public static async start(client: Client, database: Database) {
    const listeners = [
      new BotEvents(client),
      new GuildEvents(client, database),
      new MessageEvents(client, database),
    ];

    listeners.forEach((listener) => {
      // @ts-ignore
      listener.register();
    });
  }
}
