import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from "rxjs/operators";

import * as fromStore from './../store';

@Injectable({providedIn: 'root'})
export class CatalogResolver implements Resolve<void> {

  constructor(private store: Store<fromStore.State>) { }

  resolve(): void {
    this.store.select(fromStore.getAllProductEntities)
      .pipe(take(1))
      .subscribe(
      catalog => {
        if (!catalog || !catalog.length) {
          this.store.dispatch(fromStore.LoadCatalog());
        }
      }
    );

  }


}