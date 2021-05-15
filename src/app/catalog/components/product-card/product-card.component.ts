import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {IProduct} from '../../../models/IProduct';
import * as fromStore from '../../store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {

  @Input() product: IProduct;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.product = {
     name: ""
    };
  }

  ngOnInit(): void {
  }

}
