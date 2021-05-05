import {ICategory} from "./ICategory";

export interface IProduct {
  id: number,
  title: string,
  category: ICategory,
  description: string,
  longDescription: string,
  imageUrl: {
    small: string,
    big: string
  }
}