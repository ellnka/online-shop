import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { IProduct } from '../../../models/IProduct';
import * as fromStore from '../../store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit  {
  public products$: Observable<IProduct[]>;
  public productsLoading$: Observable<boolean>;
  public selectedCategoryId$: Observable<number>;

  constructor(private store: Store<fromStore.State>) {
    this.products$ = EMPTY;
    this.selectedCategoryId$ = EMPTY;
    this.productsLoading$  = EMPTY;
  }

  ngOnInit(): void {
    this.products$ = this.store.select(fromStore.getAllProductEntities);
    this.selectedCategoryId$ = this.store.select(fromStore.getSelectedCategoryId);
    this.productsLoading$  = this.store.select(fromStore.getCatalogLoading);
    this.store.dispatch(fromStore.SelectCategory({payload: 0}));
  }
}
