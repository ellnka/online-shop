import { ICategory } from "./ICategory";

export interface IRecipe {
  _id?: string,
  name: string,
  description?: string,
  image?: string,
  products?: [{
    category: ICategory,
    weight: number
  }]
}