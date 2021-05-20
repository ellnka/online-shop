import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: IProduct[] = [];

  addToCart(product: IProduct) {
    this.items.push(product);
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  getItemsCount() {
    let items = localStorage.getItem("items") || "[]";
    this.items = JSON.parse(items);
    return this.items.length;
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem("items");
    return this.items;
  }
}