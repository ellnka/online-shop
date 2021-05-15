import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {IProduct} from "../models/IProduct";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _productsUrl: string = 'assets/data/products.json';

  constructor(private http: HttpClient) { }

  getAllCatalog(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._productsUrl)
      .pipe(
        catchError(this._handleError<IProduct[]|[]>('getCatalog', []))
      );
  }

  private _handleError<T>(operation = 'operation', result?: {}) {
    return (error: any): Observable<T> => {
      console.log('ERROR', error);
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}