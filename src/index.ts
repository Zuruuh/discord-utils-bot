import "module-alias/register";

import { Intents, Client } from "discord.js";
import { config } from "dotenv";
import { Database } from "$utils/database";
import { RegisterEvents } from "$utils/RegisterEvents";

config();
const database = new Database();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

RegisterEvents.start(client, database);

client.login(process.env.TOKEN);
