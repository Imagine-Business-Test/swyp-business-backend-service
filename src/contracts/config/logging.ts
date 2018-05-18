interface Appenders {
  type: string;
  [key: string]: any;
}

export interface Logging {
  appenders: { [name: string]: Appenders };
  categories: { [name: string]: { appenders: [string], level: string }};
}
