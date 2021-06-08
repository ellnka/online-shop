import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { IProduct } from '../../../models/IProduct';
import * as fromStore from '../../store';
import { ICategory } from 'src/app/models/ICategory';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit  {
  public products$: Observable<IProduct[] | null> = EMPTY;
  public productsLoading$: Observable<boolean> = EMPTY;
  public selectedCategoryId$: Observable<string> = EMPTY;
  public categories$: Observable<ICategory[]> = EMPTY;
  public selectedCategoryId: string = "";

  constructor(private store: Store<fromStore.State>) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select(fromStore.getAllProductEntities);
    this.selectedCategoryId$ = this.store.select(fromStore.getSelectedCategoryId);
    this.productsLoading$  = this.store.select(fromStore.getCatalogLoading);
    this.store.dispatch(fromStore.SelectCategory({payload: ""}));
    this.categories$ = this.store.select(fromStore.getCategories);
  }

  filterProductsByCategory(categoryId: string) {
    this.store.dispatch(fromStore.SelectCategory({payload: categoryId}));
    this.selectedCategoryId = categoryId;
  }
}
