import { Message } from "discord.js";
import * as fs from "fs";
import * as pathInterface from "path";
import { Command } from "../types";

export class commandHandler {
  public commands: Command[] = [];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  public handle(message: Message) {
    console.log(message.guildId);
  }
}

export const parseCommands = (relativePath: string) => {
  const realPath = pathInterface.resolve(__dirname + "/../", relativePath);
  const files = fs.readdirSync(realPath);
  const commands: Command[] = [];
  files.forEach((file) => {
    const filePath = pathInterface.join(realPath + "/", file);
    const command = require(filePath);
    commands.push(command.config);
  });
  return commands;
};
