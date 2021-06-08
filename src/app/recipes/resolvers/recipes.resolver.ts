import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from "rxjs/operators";

import * as fromStore from './../store';

@Injectable({providedIn: 'root'})
export class RecipesResolver implements Resolve<void> {

  constructor(private store: Store<fromStore.State>) { }

  resolve(): void {
    this.store.select(fromStore.getAllRecipeEntities)
      .pipe(take(1))
      .subscribe(
        recipes => {
          if (!recipes || !recipes.length) {
            this.store.dispatch(fromStore.LoadRecipes());
          }
        }
      );
  }
}