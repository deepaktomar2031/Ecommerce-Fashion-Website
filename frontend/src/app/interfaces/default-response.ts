import { IProductResponse } from "./product-response";

export const defaultResponse: IProductResponse = {
    result: false,
    resultCount: 0,
    message: "",
    data: {
        filters: {},
        productData: [],
    },
};
