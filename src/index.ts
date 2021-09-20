import { Intents, Client } from "discord.js";
import * as dotenv from "dotenv";
import { commandHandler, parseCommands } from "./handlers/Command";

dotenv.config();
let Handler: commandHandler;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("ready", () => {
  console.log("Bot ready");
  const { commands, categories } = parseCommands("commands/");
  categories.length;
  Handler = new commandHandler(commands);
});

client.on("messageCreate", (message) => {
  Handler.handle(message);
});

client.login(process.env.TOKEN);
