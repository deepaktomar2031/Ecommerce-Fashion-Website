require("dotenv").config();
const SERVICE_PORT: number = parseInt(process.env.SERVICE_PORT!) || 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/";
const CLOUD_DB = process.env.CLOUD_DB || "ecom-fashion-website";

export default {
    SERVICE_PORT,
    MONGO_URL,
    CLOUD_DB,
};
