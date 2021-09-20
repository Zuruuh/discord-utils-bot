import type { Command, PermissionTranslation } from "../types";
import { GuildMember, Permissions } from "discord.js";

export class PermissionsHandler {
  public handle(command: Command, member: GuildMember | null) {
    let missing: string[] = [];
    if (command.permission) {
      command.permission.forEach((perm) => {
        const permission = new Permissions(perm);
        if (!member?.permissions.has(permission)) {
          missing.push(this.getPermissionText(perm.toString()));
        }
      });
    }

    return missing.length > 0 ? { state: false, missing } : { state: true };
  }

  public getPermissionText(permission: string): string {
    switch (permission) {
      case "268435456":
        return this.getTranslation([
          { locale: "fr-fr", value: "Gestion des rôles" },
          { locale: "en-us", value: "Manage roles" },
        ]);
      default:
        return "Translations haven't been added for this command yet.";
    }
  }

  public getTranslation(langs: PermissionTranslation[]): string {
    // TODO: Add support for server specific languages
    const serverLang = "en-us"; // Temporary leng, remove when server db config is implemented
    let value: string = "";
    langs.forEach((lang) => {
      if (lang.locale === serverLang) {
        value = lang.value;
      }
    });
    return value ?? "Translations haven't been added for this command yet.";
  }
}
