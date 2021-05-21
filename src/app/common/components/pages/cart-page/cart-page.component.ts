import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.sass']
})
export class CartPageComponent implements OnInit {
  items = this.cartService.getItems();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  getItems(): void {
    this.items = this.cartService.getItems();
  }

  removeAll() {
    this.cartService.clearCart();
    this.items = this.cartService.getItems();
  }

}
