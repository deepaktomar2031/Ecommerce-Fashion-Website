import { IProductResponse } from "../interface/IProductResponse";

export const defaultResponse: IProductResponse = {
    result: false,
    resultCount: 0,
    message: "",
    data: {
        filters: {},
        productData: [],
    },
};
