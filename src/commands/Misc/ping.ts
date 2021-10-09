import { Message, Permissions } from "discord.js";
import { Database } from "$utils/database";
import { AbstractCommand } from "$abstract/AbstractCommand";
import type { CommandConfig, RunCommand } from "$types/commands";
import type { Argument } from "$types/arguments";

export class PingCommand extends AbstractCommand {
  constructor(database: Database) {
    super(database);
  }
  private run = async ({
    message,
    args = {},
    translation,
  }: RunCommand): Promise<void> => {
    translation;
    message;
    args;
  };

  protected config: CommandConfig = {
    name: "ping",
    usage: `%prefix% ping <message>`,
    aliases: ["pong"],
    category: "misc",
    params: [
      {
        name: "reason",
        type: "FULLTEXT",
        required: true,
        generic: true,
      },
    ] as Argument[],
    permission: [Permissions.FLAGS.MANAGE_ROLES],
    run: this.run,
  };
}

module.exports = PingCommand;
