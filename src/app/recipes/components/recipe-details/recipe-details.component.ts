import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/IProduct';
import { IRecipe } from 'src/app/models/IRecipe';
import { CartService } from 'src/app/services/cart.service';

import * as fromCatalogStore from '../../../catalog/store';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.sass']
})
export class RecipeDetailsComponent implements OnInit{
  @Input() recipe: IRecipe | null = {name: ""};
  products$: Observable<IProduct[]> = EMPTY;

  constructor(private store: Store<fromCatalogStore.State>, private cartService: CartService) {}
  
  ngOnInit() {
    this.products$ = this.store.select(fromCatalogStore.getAllProductEntities);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  isProductInCart(product: IProduct) {
    return this.cartService.isItemInCart(product);
  }
}
