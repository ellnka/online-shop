import { Action, createReducer, on } from '@ngrx/store';

import * as recipesActions from '../actions/recipes.actions';
import { IRecipe } from '../../../models/IRecipe';

export interface RecipesState {
  recipes: IRecipe[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: RecipesState = {
  recipes: [],
  loaded: false,
  loading: false
};

const loadRecipes = (state: any, response: any) => {
  let recipes = response.payload;
  return {
    ...state,
    recipes,
    loaded: true,
    loading: false
  }
}

const recipesReducer = createReducer(
    initialState,
    on(recipesActions.LoadRecipes, (state: any) =>  ({ ...state, loading: true })),
    on(recipesActions.LoadRecipesFail, (state: any) => ({ ...state, loaded: false, loading: false })), 
    on(recipesActions.LoadRecipesSuccess, loadRecipes)
  );
  
export function reducer(state: RecipesState | undefined, action: Action) {
  return recipesReducer(state, action);
}

export const getRecipesLoading = (state: RecipesState) => state.loading;
export const getRecipesLoaded = (state: RecipesState) => state.loaded;
export const getRecipeEntities = (state: RecipesState) => state.recipes;


