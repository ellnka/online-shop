import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ICategory } from "../models/ICategory";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    fetchAll(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(`/api/category`);
    }

    create(category: ICategory, image?: File): Observable<ICategory> {
        const fd = this._createFormData(category, image);
        return this.http.post<ICategory>('/api/category', fd);
    }
    
    update(category: ICategory, image?: File): Observable<ICategory> {
        const fd = this._createFormData(category, image);
        return this.http.patch<ICategory>(`/api/category/${category._id}`, fd);
    }
    
    getById(id: string): Observable<ICategory> {
        return this.http.get<ICategory>(`/api/category/${id}`);
    }

    delete(category: ICategory): Observable<ICategory> {
        return this.http.delete<ICategory>(`/api/category/${category._id}`);
    }

    _createFormData(category: ICategory, image?: File): FormData {
        const fd = new FormData();
    
        if (image) {
          fd.append('image', image, image.name);
        }
        fd.append('name', category.name);
        fd.append('description', category.description || "");

        return fd;
    }


}