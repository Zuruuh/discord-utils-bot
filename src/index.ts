import 'module-alias/register';

import { Intents, Client } from "discord.js";
import { config } from "dotenv";
import { Database } from "$utils/database";
import { eventListener } from "$utils/EventListener";

config();
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
