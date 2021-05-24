import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';

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
    private cartService: CartService
  ) {
    this.product = {
     name: ""
    };
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
