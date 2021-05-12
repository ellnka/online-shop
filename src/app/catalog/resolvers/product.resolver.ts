import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store} from '@ngrx/store';
import { take } from "rxjs/operators";

import * as fromStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<void> {

  constructor(private store: Store<fromStore.State>) {}

  resolve(): void {
    this.store.select(fromStore.getAllCatalog)
      .pipe(take(1))
      .subscribe(
        products => {
          if (!products || !products.length) {
            this.store.dispatch(fromStore.LoadCatalog());
          }
        }
      );
  }
}
