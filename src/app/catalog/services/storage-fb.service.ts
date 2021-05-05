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

  constructor(private http: HttpClient) { }

  getAllCatalog(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.firebaseConfig.databaseURL}/catalog.json`).pipe(
      catchError(this._handleError<IProduct[]|[]>('get catalog', []))
    );
  }

  private _handleError<T>(operation = 'operation', result?: {}) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}