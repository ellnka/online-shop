import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/models/IOrder';
import { IUser } from 'src/app/models/IUser';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.sass']
})
export class OrderHistoryPageComponent implements OnInit {
  aSubUser: Subscription = new Subscription();
  aSubOrders: Subscription = new Subscription();
  user: IUser | undefined;
  orders: any;

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.aSubUser = this.userService.fetchCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.aSubOrders = this.orderService.fetchAllByUser(this.user?._id || "").subscribe(
          (orders) => {
            this.orders = orders;
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aSubUser) {
      this.aSubUser.unsubscribe();
    }

    if (this.aSubOrders) {
      this.aSubOrders.unsubscribe();
    }
  }

  orderProducts(order: any) {
    return order.list?.map((item: any) => item?.product?.name + " x " + item.count).join(", ");
  }

}
