export interface ILogging {
  appenders: { [name: string]: { type: string; [key: string]: any } };
  categories: { [name: string]: { appenders: string[]; level: string } };
}
