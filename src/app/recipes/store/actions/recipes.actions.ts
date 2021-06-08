import { createAction, props  } from '@ngrx/store';

import { IRecipe } from '../../../models/IRecipe';

export const LoadRecipes = createAction('[Product] Load Recipes');
export const LoadRecipesFail = createAction('[Product] Load Recipes Fail', props<{ payload: any}>());
export const LoadRecipesSuccess = createAction('[Product] Load Recipes Success', props<{ payload: IRecipe[]}>());
export const UpdateRecipe = createAction('[Product] Update Recipe', props<{ payload: IRecipe}>());