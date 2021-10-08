import { EventListener } from "$decorators/EventListener";
import { CommandHandler, parseCommands } from "$handlers/Commands";
import { Database } from "$utils/database";
import { Client, Message } from "discord.js";

@EventListener()
export class MessageEvents {
  private client: Client;
  private database: Database;
  private commandHandler: CommandHandler;

  constructor(client: Client, database: Database) {
    this.client = client;
    this.database = database;
    const { commands } = parseCommands("commands/", database);
    this.commandHandler = new CommandHandler(commands, database);
  }

  public messageCreate = async (message: Message) => {
    if (message.author.bot) return;
    await this.commandHandler.handle(message);
  };
}
