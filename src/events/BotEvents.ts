import { Client } from "discord.js";
import { EventListener } from "$decorators/EventListener";

@EventListener()
export class BotEvents {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  public ready = () => {
    console.log(
      "\x1b[42m==================================================\x1b[0m"
    );
    console.log("Bot ready");
    console.log(
      "\x1b[42m==================================================\x1b[0m"
    );
  };
}
