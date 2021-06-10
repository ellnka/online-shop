import { IProduct } from "./IProduct";

export interface IOrder {
    list?: [{
        product: IProduct,
        count: number
    }],
    user?: number,
    _id?: string,
    address?: string,
    phone?: string
}