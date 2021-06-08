import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

import * as fromRecipes from './recipes.reducer'

export interface RouterStateUrl {
  url: string,
  queryParams: Params,
  params: Params
}

export interface State {
  router: RouterReducerState<RouterStateUrl>,
  recipes: fromRecipes.RecipesState
}

export const recipesReducers = fromRecipes.reducer;