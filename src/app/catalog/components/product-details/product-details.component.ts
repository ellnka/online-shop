import { Component, OnInit, Input } from '@angular/core';
import { EMPTY } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import {IProduct} from '../../../models/IProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: IProduct | null;
  
  constructor(private cartService: CartService) {
    this.product = {
      name: ""
    };
  }

  ngOnInit(): void {
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

}
