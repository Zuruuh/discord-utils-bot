import { Message, Permissions } from "discord.js";
import { Command } from "../../types";

const run = async (message: Message, args: any) => {
  message.channel.send("Pong!");
  message.channel.send("User: " + args["user"]);
  message.channel.send("Title: " + args["title"]);
  message.channel.send("Full Text: " + args["content"]);
};

export const config = {
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
  run,
} as Command;
