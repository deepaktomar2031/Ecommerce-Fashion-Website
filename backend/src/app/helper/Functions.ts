import {  IQueryInput, IQueryOutput, ISortingOutput } from "../interface/IQuery";
import {  sortProperty } from "../enum/filters";

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
