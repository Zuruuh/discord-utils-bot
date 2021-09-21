export type Argument = {
  name: string;
  type?: "STRING" | "INTEGER" | "TIME" | "FULLTEXT" | "USER" | "CHANNEL";
  required: boolean;
};
export type ArgumentError = {
  type: "INVALID" | "MISSING";
};

export type ArgumentResponse = {
  state: boolean;
  message?: string;
  params?: any;
};
