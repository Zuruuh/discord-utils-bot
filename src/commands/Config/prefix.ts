import { Message, Permissions } from "discord.js";
import { Database } from "../../database";
import { CommandConfig } from "../../handlers/commands-types";
import { AbstractCommand } from "../Abstract/AbstractCommand";
import { Guild as GuildSchema } from ".prisma/client";
export class PrefixCommand extends AbstractCommand {
  constructor(database: Database) {
    super(database);
  }

  private run = async (message: Message, args: any): Promise<void> => {
    const config: GuildSchema | undefined = await this.getServerConfig(message);
    if (config) {
      await this.prisma.guildConfig.update({
        where: {
          guildId: config.id,
        },
        data: {
          prefix: args["prefix"],
        },
      });
    }
    message.channel.send(
      "Success ! This server's prefix has been set to \"" + args["prefix"] + '"'
    );
  };

  protected config: CommandConfig = {
    name: "prefix",
    usage: `%prefix% ping <message>`,
    aliases: [],
    category: "config",
    params: [
      {
        name: "prefix",
        type: "FULLTEXT",
        required: true,
      },
    ],
    permission: [Permissions.FLAGS.MANAGE_GUILD],
    run: this.run,
  };
}

module.exports = PrefixCommand;
