import container from "./container";
import { App } from "../../contracts/app";

const app: App = <App>container.resolve("app");

app.start();
