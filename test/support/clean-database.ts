import container from "../../src/interfaces/http/container";
const database: any = container.resolve("database");

export const cleanDatabase = () => database.drop();
