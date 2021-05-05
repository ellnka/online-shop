import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { IProduct } from "../models/IProduct";
import { ICategory } from "../models/ICategory";

import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _selectedCategorySubject: BehaviorSubject<ICategory> = new BehaviorSubject({id: 0, title: "All"});
  public readonly selectedCategory$: Observable<ICategory> = this._selectedCategorySubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCatalog(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.firebaseConfig.databaseURL}/catalog.json`).pipe(
      catchError(this._handleError<IProduct[]|[]>('get catalog', []))
    );
  }

  getProductById(id: string): Observable<IProduct | {}> {
    console.log(`${environment.firebaseConfig.databaseURL}/catalog/${id}.json`);
    return this.http.get<IProduct>(`${environment.firebaseConfig.databaseURL}/catalog/${id}.json`).pipe(
      catchError(this._handleError<IProduct | {}>('get product by id', {}))
    );
  }

  editProduct(product: IProduct): Observable<IProduct | {}> {
    return this.http.patch<IProduct>(`${environment.firebaseConfig.databaseURL}/catalog/${product.id}.json`, product).pipe(
      catchError(this._handleError<IProduct | {}>('edit Product', {}))
    );
  }

  changeSelectedCategory(category: ICategory) {
    this._selectedCategorySubject.next(category);
  }

  private _handleError<T>(operation = 'operation', result?: {}) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}