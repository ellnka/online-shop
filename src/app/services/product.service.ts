import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../models/IProduct";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {}

    fetchAll(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(`/api/product/`);
    }

    fetch(categoryId: string): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(`/api/product/${categoryId}`);
    }

   create(product: IProduct, imageBig?: File, imageSmall?: File): Observable<IProduct> {
        const fd = this._createFormData(product, imageBig, imageSmall);
        return this.http.post<IProduct>(`/api/product`, fd);
    }

    update(product: IProduct, imageBig?: File, imageSmall?: File): Observable<IProduct> {
        const fd = this._createFormData(product, imageBig, imageSmall);
        return this.http.patch<IProduct>(`/api/product/${product._id}`, fd);
    }

    delete(product: IProduct): Observable<IProduct> {
        return this.http.delete<IProduct>(`/api/product/${product._id}`);
    }

    _createFormData(product: IProduct, imageBig?: File, imageSmall?: File): FormData {
        const fd = new FormData();
    
        if (imageBig) {
            fd.append('imageBig', imageBig, imageBig.name);
        }
        if (imageSmall) {
            fd.append('imageSmall', imageSmall, imageSmall.name);
        }
        fd.append('name', product.name);
        fd.append('description', product.description || "");
        fd.append('cost', product.cost + "" || "");
        fd.append('category', product.category?._id || "");

        return fd;
    }

}