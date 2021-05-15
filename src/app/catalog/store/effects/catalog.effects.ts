import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

import * as catalogActions from './../actions/catalog.actions';

@Injectable()
export class CatalogEffects {
  constructor(
    private productSerevice: ProductService,
    private categorySerevice: CategoryService,
    private actions$: Actions
  ) {}

  loadCatalog$ =  createEffect(() => this.actions$.pipe(
    ofType(catalogActions.LoadCatalog),
    switchMap(() => {
      return this.productSerevice.fetchAll().pipe(
        map(products => catalogActions.LoadCatalogSuccess({payload: products})),
        catchError(error => of(catalogActions.LoadCatalogFail(error)))
      );}
      )
  ));

  loadCategories$ =  createEffect(() => this.actions$.pipe(
    ofType(catalogActions.LoadCatalog),
    switchMap(() => {
      return this.categorySerevice.fetchAll().pipe(
        map(categories => catalogActions.LoadCategoriesSuccess({payload: categories})),
        catchError(error => of(catalogActions.LoadCatalogFail(error)))
      );}
      )
  ));
}