import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import { commandHandler, parseCommands } from "./handlers/Command";

dotenv.config();
let Handler: commandHandler;

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("ready", () => {
  const commands = parseCommands("commands/");
  Handler = new commandHandler(commands);
});

client.on("messageCreate", (message) => {
  Handler.handle(message);
});

client.login(process.env.TOKEN);
