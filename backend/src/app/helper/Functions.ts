import { IQueryInput, IQueryOutput, ISortingOutput } from "../interface/IQuery";
import { sortProperty, filters } from "../enum/filters";
import { IProductResponse } from "../interface/IProductResponse";
import { LogErrorMessage } from "../utils/error-handler";
import { defaultResponse } from "../utils/default-response";
import ProductSchema from "../model/product";

export const QueryBuilder = (queryInputs: IQueryInput): IQueryOutput => {
    const { brandName, category } = queryInputs as IQueryInput;
    const queryString = {} as IQueryOutput;

    if (queryInputs.brandName) queryString.brandName = brandName;
    if (queryInputs.category) queryString.category = category;

    return queryString;
};

export const SortingBuilder = (sortingInputs: IQueryInput): ISortingOutput => {
    const { price } = sortingInputs as IQueryInput;
    const sortString = {} as ISortingOutput;

    if (price === sortProperty.asc) sortString.price = 1;
    else if (price === sortProperty.desc) sortString.price = -1;
    else sortString.stock = -1;

    return sortString;
};

// Function to return distinct perperty of supplied kind so that frontend could show those many filters
export const GetDistinctProperty = async (perpertyName: string): Promise<string[] | undefined> => {
    try {
        return await ProductSchema.distinct(perpertyName);
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
    }
};

export const SetDistinctProperty = async (): Promise<IProductResponse> => {
    const responseObject = defaultResponse as IProductResponse;

    for (const value of Object.values(filters)) {
        responseObject.data.filters[value] = await GetDistinctProperty(value);
    }

    return responseObject;
};
