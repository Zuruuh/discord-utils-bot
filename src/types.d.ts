export type Argument = {
  name: string;
  description: string;
  required: boolean;
};

export type Command = {
  name: string;
  description: string;
  usage: string;
  aliases: string[];
  category: string;
  args: Argument[];
};
