import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit{
  mainTitle: string = "title";
  @Input() title: string = "title";
  selectedCategoryId: string = "";
  isAuth: boolean;

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router) {
      this.isAuth = false;
  }

  ngOnInit() {
    this.isAuth = this.auth.isAuth();
  }

  getCartItemsCount() {
    return this.cartService.getItemsCount()
  }

  

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
