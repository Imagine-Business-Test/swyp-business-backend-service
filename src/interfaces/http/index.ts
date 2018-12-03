import { IApp } from "../../contracts/app";
import container from "./container";

const app: IApp = container.resolve("app") as IApp;

app.start();
