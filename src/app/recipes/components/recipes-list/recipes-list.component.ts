import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';


import { IRecipe } from 'src/app/models/IRecipe';

import * as fromStore from '../../store';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.sass']
})
export class RecipesListComponent implements OnInit {
  public recipes$: Observable<IRecipe[] | null> = EMPTY;
  public recipesLoading$: Observable<boolean> = EMPTY;

  constructor(private store: Store<fromStore.State>) {
  }

  ngOnInit(): void {
    this.recipes$ = this.store.select(fromStore.getAllRecipeEntities);
    this.recipesLoading$  = this.store.select(fromStore.getRecipesLoading);
  }
}
