import { PermissionFlags } from "discord.js";

export type Argument = {
  name: string;
  type?: "STRING" | "INTEGER" | "TIME" | "FULLTEXT" | "USER" | "CHANNEL";
  required: boolean;
};

export type Command = {
  name: string;
  usage: string;
  aliases?: string[];
  category: string;
  params?: Argument[];
  permission?: bigint[];
  run: Function;
};

export type Category = {
  uuid: string;
};

export type PermissionTranslation = {
  locale: string;
  value: string;
};

export type ArgumentError = {
  type: "INVALID" | "MISSING";
};

export type ArgumentResponse = {
  state: boolean;
  message?: string;
  params?: any;
};
