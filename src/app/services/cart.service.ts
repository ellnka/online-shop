import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: {product: IProduct, count: number}[] = [];

  addToCart(product: IProduct) {
    let isAlreadyAdded = false;

    this.items.forEach(item => {
      if (item.product._id === product._id) {
        item.count++;
        isAlreadyAdded = true;
      }
    });
    if (!isAlreadyAdded) {
      this.items.push({product, count: 1});
    }
    
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  changeItemCount(product: IProduct, count: number) {
    this.items.forEach((item) => {
      if (item.product._id === product._id) {
        item.count = count;
      }
    });

    localStorage.setItem("items", JSON.stringify(this.items));
  }

  removeFromCart(product: IProduct) {
    const indexOfRemovedItem = this.items.findIndex(item => item.product._id === product._id);
    this.items.splice(indexOfRemovedItem, 1);
   
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  getItems() {
    let items = localStorage.getItem("items") || "[]";
    this.items = JSON.parse(items);
    return this.items;
  }

  getItemsCount() {
    return this.getItems().reduce((result, item) => result + item.count, 0);
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem("items");
    return this.items;
  }
}