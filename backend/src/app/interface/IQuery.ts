export interface IQueryInput {
    brandName?: String;
    category?: String;
    price?: String;
}

export interface IQueryOutput {
    brandName?: String;
    category?: String;
}

export interface ISortingOutput {
    [key: string]: -1 | 1;
}
