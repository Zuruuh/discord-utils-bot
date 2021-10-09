import { GuildMember, Permissions } from "discord.js";
import type { PermissionTranslation } from "$types/types";
import type { CommandConfig } from "$types/commands";
import { Translation } from "$types/langs";

export class PermissionsHandler {
  public handle(
    command: CommandConfig,
    member: GuildMember | null,
    translation: Translation
  ) {
    let missing: string[] = [];
    if (command.permission) {
      command.permission.forEach((perm) => {
        const permission = new Permissions(perm);
        if (!member?.permissions.has(permission)) {
          missing.push(translation.permissions[perm.toString()]);
        }
      });
    }

    return missing.length > 0 ? { state: false, missing } : { state: true };
  }
}
