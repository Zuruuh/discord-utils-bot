import { Message } from "discord.js";
import { readdirSync } from "fs";
import { resolve, join } from "path";
import { ArgumentsHandler } from "./Arguments";
import { PermissionsHandler } from "./Permissions";

import type { ArgumentResponse, Category, Command } from "../types";
export class commandHandler {
  private commands: Command[] = [];
  private permissionsHandler = new PermissionsHandler();
  private argumentsHandler = new ArgumentsHandler();

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  public handle(message: Message) {
    const commandData = this.getCommand(message);
    if (!commandData) {
      return;
    }
    const command = commandData.command;
    const args = commandData.args;
    const { member } = message;

    // ! 1 - Check for permissions

    const hasPermissions = this.permissionsHandler.handle(command, member);
    if (!hasPermissions.state) {
      const missing = hasPermissions.missing ?? [];
      message.channel.send(`
          You are missing the following permissions:\
          \`\`\`diff\n${missing.map((perm) => `- ${perm} \n`)}\`\`\`\
          `);
      return;
    }

    // ! 2 - Verify arguments
    let params: ArgumentResponse = { state: true };
    if (command.params) {
      params = this.argumentsHandler.handle(args, command.params, command.name);
      if (!params.state) {
        message.channel.send(
          params.message ??
            "Server side error, contact Zuruh#0798 to report this bug please :)"
        );
        return;
      }
    }

    // ! 3 - Check if perms and args are valid
    command.run(message, params.params);
  }

  private getCommand(message: Message) {
    const prefix: string = process.env.PREFIX ?? ";";
    const regex: RegExp = /\s+/gi;
    let command: string = message.content;
    let exists: Command | undefined;

    command = command.replace(regex, " ");
    const args: string[] = command.split(" ");
    let commandName = command[0];
    if (commandName.startsWith(prefix)) {
      commandName = args[0].slice(prefix.length, args[0].length).toLowerCase();

      args.shift();
      exists = this.commands.find(
        (cmd) => cmd.name.toLowerCase() === commandName ?? undefined
      );
      if (!exists) {
        this.commands.forEach((cmd) => {
          if (!exists) {
            exists = cmd.aliases?.find(
              (alias) => alias.toLowerCase() === commandName
            )
              ? cmd
              : undefined;
          }
        });
      }
    } else {
      return undefined;
    }
    if (typeof exists === "object") {
      return { command: exists, args };
    }
    message.channel.send("This command does not exist !");
    return undefined;
  }
}

export const parseCommands = (relativePath: string) => {
  const realPath = resolve(`${__dirname}/../${relativePath}`);
  const categoriesDir = readdirSync(realPath);
  const commands: Command[] = [];
  const categories: Category[] = [];

  categoriesDir.forEach((category) => {
    const files = readdirSync(`${realPath}/${category}`);
    files.forEach((file) => {
      if (!file.match(/^category-config.[t|j]s$/gi)) {
        const filePath = join(`${realPath}/${category}/${file}`);
        const command = require(filePath);
        commands.push(command.config);
      } else {
        const filePath = join(`${realPath}/${category}/${file}`);
        const categoryConfig = require(filePath);
        categories.push(categoryConfig);
      }
    });
  });
  return { commands, categories };
};
