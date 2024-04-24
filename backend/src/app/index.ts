import express, { Express } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import DBConnector from "./db-connector";
import Config from "./config";

import { routes } from "./routes";

export const app: Express = express();

const connectDatabases = async () => {
    await DBConnector.connectMongo(Config.MONGO_URL + Config.FASHION_CLOUD_DB);
};

const addBodyParser = async () => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};

const createRoutes = () => {
    routes(app);
};

const listenPort = (PORT: number) => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};

const useCors = () => {
    app.use(cors());
};

async function start() {
    useCors();
    if (process.env.NODE_ENV !== "test") {
        await connectDatabases();
        await listenPort(Config.SERVICE_PORT);
    }
    await addBodyParser();
    await createRoutes();
}

export default {
    start,
};
