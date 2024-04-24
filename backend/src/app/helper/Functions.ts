import { IQueryInput, IQueryOutput } from "../interface/IQuery";

export const QueryBuilder = (queryInputs: IQueryInput): IQueryOutput => {
    const { brandName, category } = queryInputs as IQueryInput;
    const queryString = {} as IQueryOutput;

    if (queryInputs.brandName) queryString.brandName = brandName;
    if (queryInputs.category) queryString.category = category;

    return queryString;
};
