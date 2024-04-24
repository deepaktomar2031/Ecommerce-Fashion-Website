export interface IProductData {
  gtin: Number;
  name: String;
  image?: String;
  brandName: String;
  category: String;
  color: String;
  stock: Number;
  price: Number;
  createdAt?: Date;
  updatedAt?: Date;
}
