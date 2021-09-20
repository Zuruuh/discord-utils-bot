import { Intents, Client } from "discord.js";
import * as dotenv from "dotenv";
import { commandHandler, parseCommands } from "./handlers/Commands";

dotenv.config();
let CommandHandler: commandHandler;

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
  CommandHandler = new commandHandler(commands);
});

client.on("messageCreate", (message) => {
  CommandHandler.handle(message);
});

client.login(process.env.TOKEN);
