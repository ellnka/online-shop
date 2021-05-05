import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DataService } from '../../services/data-fb.service';
import * as catalogActions from './../actions/catalog.actions';

@Injectable()
export class CatalogEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions
  ) {}

  loadCatalog$ =  createEffect(() => this.actions$.pipe(
    ofType(catalogActions.LoadCatalog),
    switchMap(() => {
      return this.dataService.getAllCatalog().pipe(
        map(catalog => catalogActions.LoadCatalogSuccess({payload: catalog})),
        catchError(error => of(catalogActions.LoadCatalogFail(error)))
      );})
  ));
}