import { IProductData } from './product';

export interface IProductResponse {
  result: Boolean;
  resultCount: Number;
  message: String;
  data: {
    filters: {
      [key: string]: String[] | undefined;
    };
    productData: IProductData[];
  };
}

