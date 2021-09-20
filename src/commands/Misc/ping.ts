import { Message, Permissions } from "discord.js";
import { Command, CommandConfig } from "../../handlers/commands-types";
import { AbstractCommand } from "../Abstract/AbstractCommand";

class PingCommand extends AbstractCommand {
  constructor() {
    super();
  }
  private run = async (message: Message, args: any): Promise<void> => {
    message.channel.send("Pong!");
    message.channel.send("User: " + args["user"]);
    message.channel.send("Title: " + args["title"]);
    message.channel.send("Full Text: " + args["content"]);
  };

  protected config: CommandConfig = {
    name: "ping",
    usage: `%prefix% ping <message>`,
    aliases: ["pong"],
    category: "misc",
    params: [
      {
        name: "user",
        type: "USER",
        required: true,
      },
      {
        name: "title",
        required: true,
      },
      {
        name: "content",
        type: "FULLTEXT",
        required: false,
      },
    ],
    permission: [Permissions.FLAGS.MANAGE_ROLES],
    run: this.run,
  };
}

module.exports = PingCommand;
