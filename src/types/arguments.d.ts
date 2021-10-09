export type Argument = {
  name: string;
  generic: boolean;
  type?: "STRING" | "INTEGER" | "TIME" | "FULLTEXT" | "USER" | "CHANNEL";
  required: boolean;
};
export type ArgumentError = {
  type: "INVALID" | "MISSING";
};

export type ArgumentResponse = {
  state: boolean;
  message?: string | boolean;
  params?: any;
};
