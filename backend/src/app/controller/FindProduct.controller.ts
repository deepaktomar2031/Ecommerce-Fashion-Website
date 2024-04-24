import { Request, Response } from "express";
import { statusCode } from "../enum/status-code";

export const FindProduct = async (req: Request, res: Response) => {
    try {
        return res.status(statusCode.successful_request).send({ result: true });
    } catch (error: unknown) {
        return res.status(statusCode.internal_server_error).send({ result: false });
    }
};
