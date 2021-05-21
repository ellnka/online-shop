import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass']
})


export class CartItemComponent implements OnInit {

  @Input() item:{product: IProduct, count: number}|null = null;;
  count: number = 0;
  currency = "$";


  constructor(private cartService: CartService) { }
  @Output() delete = new EventEmitter();

  ngOnInit(): void {
    this.count = this.item?.count || 0;
  }

  changeCount(count: number) {
    if ((count < 0 && this.count === 1) || (this.item === null)) {
      return;
    }
    
    this.count += count;
    setTimeout(() => this.item!==null && this.cartService.changeItemCount(this.item.product, this.count), 2000);
  }

  removeItem() {
    if (!this.item) {
      return;
    }
    this.delete.emit("");
    this.cartService.removeFromCart(this.item.product);
  }


}
