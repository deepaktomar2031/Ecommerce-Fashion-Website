import { Request, Response } from "express";
import { statusCode } from "../enum/status-code";
import ProductSchema from "../model/product";
import { IProductData } from "../interface/IProductData";
import { message } from "../utils/locale";
import { LogErrorMessage } from "../utils/error-handler";
import { SetDistinctProperty, QueryBuilder, SortingBuilder } from "../helper/Functions";
import { IQueryOutput, ISortingOutput } from "../interface/IQuery";
import { IProductResponse } from "../interface/IProductResponse";

export const FindProduct = async (req: Request, res: Response) => {
    try {
        const response = (await SetDistinctProperty()) as IProductResponse;
        const queryString = QueryBuilder(req.query) as IQueryOutput;
        const sortString = SortingBuilder(req.query) as ISortingOutput;

        const result = (await ProductSchema.find(queryString).sort(sortString)) as IProductData[];

        response.result = true as boolean;
        response.resultCount = result.length as number;
        response.message = message.Fetched_successfully as string;
        response.data.productData = result as IProductData[];

        return res.status(statusCode.successful_request).send({ result: true, message: message.Fetched_successfully, response });
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
        return res.status(statusCode.internal_server_error).send({ result: false, message: message.Something_went_wrong });
    }
};
