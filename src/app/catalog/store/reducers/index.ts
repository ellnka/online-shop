import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

import * as fromCatalog from './catalog.reducer'

export interface RouterStateUrl {
  url: string,
  queryParams: Params,
  params: Params
}

export interface State {
  router: RouterReducerState<RouterStateUrl>,
  catalog: fromCatalog.CatalogState
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  catalog: fromCatalog.reducer
}