import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IOrder } from "../models/IOrder";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor( private http: HttpClient) {}
    fetchAllByUser(user: string): Observable<IOrder[]> {
        return this.http.get<IOrder[]>(`/api/order/${user}`);
    }

    create(items: any, order: any) {
        const newOrder = {
            user: order.user,
            address: order.address,
            phone: order.phone,
            list: items.map((item: any) => ({product: item.product?._id, count: item.count}))
        };
        return this.http.post(`/api/order`, newOrder);
    }

}