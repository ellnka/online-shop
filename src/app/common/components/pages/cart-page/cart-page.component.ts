import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { IOrder } from 'src/app/models/IOrder';
import { IProduct } from 'src/app/models/IProduct';
import { IUser } from 'src/app/models/IUser';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.sass']
})
export class CartPageComponent implements OnInit {
  items = this.cartService.getItems();
  isOrderCompleted: boolean = false;
  address: string = "";
  phone: string = "";
  aSub: Subscription = new Subscription();
  user: IUser | undefined;
  order: IOrder | undefined;

  constructor(private cartService: CartService, private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.getItems();
    this.aSub = this.userService.fetchCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.address = user.address || "";
        this.phone = user.phone || "";
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  getItems(): void {
    this.items = this.cartService.getItems();
  }

  totalPrice(): number {
    const items = this.cartService.getItems();
    return items.reduce(
      (amount: number, item: {product: IProduct, count: number}): number => amount + (item.product?.cost || 0) * item.count, 0);
  }

  checkout() {
    const order = {
      user: this.user?._id || "",
      address: this.address || "",
      phone: this.phone || ""
    };

    this.aSub = this.orderService.create(this.items, order).subscribe(
      (order: any) => {
        this.removeAll();
        this.isOrderCompleted = true;
        this.order = order;
      },
      error => {
          // TODO: handle error
      }); 
  }

  removeAll() {
    this.cartService.clearCart();
    this.items = this.cartService.getItems();
  }
}
