import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { getRouterState } from './../../../store/router.selectors';
import { IRecipe } from '../../../models/IRecipe';

import * as fromRecipes from '../reducers/recipes.reducer';

const getRecipesState = (state: State) => state.recipes;

export const getRecipesLoaded = createSelector(getRecipesState, fromRecipes.getRecipesLoaded);
export const getRecipesLoading = createSelector(getRecipesState, fromRecipes.getRecipesLoading);
export const getAllRecipeEntities = createSelector(getRecipesState, fromRecipes.getRecipeEntities);
export const getSelectedRecipe = createSelector(getAllRecipeEntities, getRouterState, getRecipeFromRoute);

function getRecipeFromRoute(recipes: IRecipe[], router: any ): IRecipe {
  const index = recipes.findIndex(recipe => recipe._id === router.state.params.id)
  return router.state && recipes[index];
}