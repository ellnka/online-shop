import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { IRecipe } from 'src/app/models/IRecipe';
import * as fromStore from './../../../store';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.sass']
})
export class RecipePageComponent implements OnInit {
  public recipe$: Observable<IRecipe> = EMPTY;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit(): void {
    this.recipe$ = this.store.select(fromStore.getSelectedRecipe);
  }
}
