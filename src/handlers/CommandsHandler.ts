import { Message } from "discord.js";
import { readdirSync } from "fs";
import { resolve, join } from "path";
import { Database } from "$utils/database";
import { PrismaClient } from ".prisma/client";

import { ArgumentsHandler } from "$handlers/ArgumentsHandler";
import { PermissionsHandler } from "$handlers/PermissionsHandler";
import { TranslationsHandler } from "./TranslationsHandler";

import type { Category } from "$types/types";
import type { ArgumentResponse } from "$types/arguments";
import type { Command, CommandConfig, ParsedCommand } from "$types/commands";
import type { Lang, Translation } from "$types/langs";

export class CommandHandler {
  private prisma: PrismaClient;
  private commands: ParsedCommand[] = [];
  private permissionsHandler: PermissionsHandler;
  private argumentsHandler: ArgumentsHandler;

  constructor(commands: ParsedCommand[], database: Database) {
    this.prisma = database.getDB();
    this.commands = commands;
    this.permissionsHandler = new PermissionsHandler();
    this.argumentsHandler = new ArgumentsHandler();
  }

  public async handle(message: Message) {
    const serverConfig = await this.prisma.guild.findUnique({
      where: {
        guildId: message.guild?.id,
      },
      include: {
        guildConfig: true,
      },
    });
    const prefix: string = serverConfig?.guildConfig?.prefix ?? ";";
    const lang: Lang = (serverConfig?.guildConfig?.lang as Lang) ?? "en-US";
    const translation: Translation = new TranslationsHandler(
      lang
    ).getTranslation();

    const commandData = this.getCommand(message, prefix);
    if (!commandData) {
      return;
    }
    const { command, args } = commandData;
    const { member } = message;

    // ! 1 - Check for permissions

    const hasPermissions = this.permissionsHandler.handle(
      command,
      member,
      translation
    );
    if (!hasPermissions.state) {
      const missing = hasPermissions.missing ?? [];
      message.channel.send(`
          \`\`\`diff\n${missing.map((perm) => `- ${perm} \n`)}\`\`\`\
          `);
      return;
    }

    // ! 2 - Verify arguments
    let params: ArgumentResponse = { state: true, params: {} };
    if (command.params) {
      params = this.argumentsHandler.handle(
        args,
        command.params,
        command.name,
        translation
      );
      if (!params.state) {
        // @ts-expect-error
        message.channel.send(params.message ?? translation.common.error);
        return;
      }
    }

    await command.run({ message, args: params.params, translation });
  }

  private getCommand(message: Message, prefix: string) {
    const regex: RegExp = /\s+/gi;
    let command: string = message.content;
    let exists: CommandConfig | undefined;

    command = command.replace(regex, " ");
    const args: string[] = command.split(" ");
    let commandName = command[0];
    if (commandName.startsWith(prefix)) {
      commandName = args[0].slice(prefix.length, args[0].length).toLowerCase();

      args.shift();
      this.commands.find((cmd) => {
        if (cmd.name.toLowerCase() === commandName) {
          exists = cmd.command.getConfig() as CommandConfig;
        } else if (!exists) {
          exists = undefined;
        }
      });
      if (!exists) {
        this.commands.forEach((cmd) => {
          if (!exists) {
            cmd.command.getConfig().aliases?.find((alias) => {
              if (alias.toLowerCase() === commandName) {
                exists = cmd.command.getConfig();
              } else {
                exists = undefined;
              }
            });
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

export const parseCommands = (relativePath: string, DB: Database) => {
  const realPath = resolve(`${__dirname}/../${relativePath}`);
  const categoriesDir = readdirSync(realPath);
  let commands: ParsedCommand[] = [];
  const categories: Category[] = [];

  categoriesDir.forEach((category) => {
    if (category !== "Abstract") {
      const files = readdirSync(`${realPath}/${category}`);
      files.forEach((file) => {
        if (!file.match(/^category-config.[t|j]s$/gi)) {
          const filePath = join(`${realPath}/${category}/${file}`);
          const commandClass = require(filePath);
          const command = new commandClass(DB) as Command;
          commands.push({
            name: file.slice(0, file.length - 3),
            command,
          } as ParsedCommand);
        } else {
          const filePath = join(`${realPath}/${category}/${file}`);
          const categoryConfig = require(filePath);
          categories.push(categoryConfig);
        }
      });
    }
  });
  return { commands, categories };
};
