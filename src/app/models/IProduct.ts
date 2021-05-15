import { ICategory } from "./ICategory";

export interface IProduct {
  name: string,
  category?: ICategory,
  description?: string,
  longDescription?: string,
  imageSmall?: string,
  imageBig?: string,
  cost?: number,
  user?: number,
  _id?: string
}