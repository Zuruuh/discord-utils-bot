export type CommandConfig = {
  name: string;
  usage: string;
  aliases?: string[];
  category: string;
  params?: Argument[];
  permission?: bigint[];
  run: Function;
};

export type Command = {
  config: Command;
  run: Function;
  getConfig(): CommandConfig;
};

export type ParsedCommand = {
  name: string;
  command: Command;
};
