import { Interaction } from "discord.js";
import { Argument } from "../types";

const name: string = "ping";
const description: string = "Ping the bot";
const usage: string = "";
const aliases: string[] = [];
const category: string = "misc";
const args: Argument[] = [
  {
    name: "message",
    description: "The message the bot will reply",
    required: false,
  },
];

module.exports.run = async (interaction: Interaction) => {
  if (interaction?.channel) {
    interaction.channel.send("Pong!");
  }
};

module.exports.config = {
  name,
  description,
  usage,
  aliases,
  category,
  args,
};
