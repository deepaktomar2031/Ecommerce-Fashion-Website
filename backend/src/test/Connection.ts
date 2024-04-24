import mongoose from "mongoose";
import Config from "./../app/config/index";
import { LogErrorMessage } from "./../app/utils/error-handler";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(Config.MONGO_URL + Config.FASHION_CLOUD_DB);
        console.log(`Successfully Connected to MongoDB!`);
    } catch (error: unknown) {
        console.error(`An error occurred ${LogErrorMessage(error)}`);
        process.exit(1);
    }
};

export const DisconnectDB = async () => {
    try {
        await mongoose.disconnect();
        await mongoose.connection.close();
    } catch (error: unknown) {
        console.error(`An error occurred ${LogErrorMessage(error)}`);
    }
};
