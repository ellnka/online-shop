import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IRecipe } from "../models/IRecipe";

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    constructor(private http: HttpClient) {}

    fetchAll(): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>(`/api/recipe/`);
    }

    fetch(categoryId: string): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>(`/api/recipe/${categoryId}`);
    }

   create(recipe: IRecipe, image?: File): Observable<IRecipe> {
        const fd = this._createFormData(recipe, image);
        return this.http.post<IRecipe>(`/api/recipe`, fd);
    }

    update(recipe: IRecipe, image?: File): Observable<IRecipe> {
        const fd = this._createFormData(recipe, image);
        return this.http.patch<IRecipe>(`/api/recipe/${recipe._id}`, fd);
    }

    delete(recipe: IRecipe): Observable<IRecipe> {
        return this.http.delete<IRecipe>(`/api/recipe/${recipe._id}`);
    }

    _createFormData(recipe: IRecipe, image?: File): FormData {
        const fd = new FormData();
    
        if (image) {
            fd.append('image', image, image.name);
        }

        fd.append('name', recipe.name);
        fd.append('description', recipe.description || "");
        fd.append('products', JSON.stringify(recipe.products || []));

        return fd;
    }

}