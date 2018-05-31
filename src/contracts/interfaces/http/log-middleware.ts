import { Logger } from "../../infra";

export type LogMiddleware = (logger: Logger) => void;
