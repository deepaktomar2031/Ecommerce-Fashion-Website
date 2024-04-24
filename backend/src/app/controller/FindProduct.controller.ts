import { Request, Response } from "express";
import { statusCode } from "../enum/status-code";
import ProductSchema from "../model/product";
import { IProductData } from "../interface/IProductData";
import { message } from "../utils/locale";
import { LogErrorMessage } from "../utils/error-handler";

export const FindProduct = async (req: Request, res: Response) => {
    try {
        const response = (await ProductSchema.find()) as IProductData[];
        return res.status(statusCode.successful_request).send({ result: true, message: message.Fetched_successfully, response });
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
        return res.status(statusCode.internal_server_error).send({ result: false, message: message.Something_went_wrong });
    }
};
