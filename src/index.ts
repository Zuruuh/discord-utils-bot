import { Intents, Client } from "discord.js";
import * as dotenv from "dotenv";
import { Database } from "./database";
import { eventListener } from "./EventListener";

dotenv.config();
const DB = new Database();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

new eventListener(client, DB).start();

client.login(process.env.TOKEN);
