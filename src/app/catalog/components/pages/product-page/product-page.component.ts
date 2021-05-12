import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { IProduct } from "../../../models/IProduct";
import * as fromStore from './../../../store';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass']
})
export class ProductPageComponent implements OnInit {

  public product$: Observable<IProduct>;

  constructor(private store: Store<fromStore.State>) {
    this.product$ = EMPTY;
  }

  ngOnInit(): void {
    this.product$ = this.store.select(fromStore.getSelectedProduct);
  }

}
