import type { PermissionTranslation } from "../types";
import type { CommandConfig } from "./commands-types";
import { GuildMember, Permissions } from "discord.js";

export class PermissionsHandler {
  public handle(
    command: CommandConfig,
    member: GuildMember | null,
    lang: string = "en-us"
  ) {
    let missing: string[] = [];
    if (command.permission) {
      command.permission.forEach((perm) => {
        const permission = new Permissions(perm);
        if (!member?.permissions.has(permission)) {
          missing.push(this.getPermissionText(perm.toString(), lang));
        }
      });
    }

    return missing.length > 0 ? { state: false, missing } : { state: true };
  }

  public getPermissionText(permission: string, lang: string): string {
    switch (permission) {
      case "268435456":
        return this.getTranslation(
          [
            { locale: "fr-fr", value: "Gestion des rôles" },
            { locale: "en-us", value: "Manage roles" },
          ],
          lang
        );
      default:
        return "Translations haven't been added for this Permission yet.";
    }
  }

  public getTranslation(
    langs: PermissionTranslation[],
    serverLang: string
  ): string {
    // TODO: Add support for server specific languages
    let value: string = "";
    langs.forEach((lang) => {
      if (lang.locale === serverLang) {
        value = lang.value;
      }
    });
    return value ?? "Translations haven't been added for this command yet.";
  }
}
