import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/IProduct';

import * as fromStore from './../../../catalog/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  title = 'angular-text-search-highlight';
  searchText = '';
  public products$: Observable<IProduct[] | null> = EMPTY;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(fromStore.getAllProductEntities);
  }

  clear() {
    this.searchText = '';
  }

}
