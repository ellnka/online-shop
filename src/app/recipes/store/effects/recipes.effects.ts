import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { RecipesService } from 'src/app/services/recipes.service';
import * as recipesActions from './../actions/recipes.actions';

@Injectable()
export class RecipesEffects {
  constructor(
    private recipesSerevice: RecipesService,
    private actions$: Actions
  ) {}

  loadRecipes$ =  createEffect(() => this.actions$.pipe(
    ofType(recipesActions.LoadRecipes),
    switchMap(() => {
      return this.recipesSerevice.fetchAll().pipe(
        map(recipes => recipesActions.LoadRecipesSuccess({payload: recipes})),
        catchError(error => of(recipesActions.LoadRecipesFail(error)))
      );}
      )
  ));
}