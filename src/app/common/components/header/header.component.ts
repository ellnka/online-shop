import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import * as fromStore from './../../../catalog/store';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/models/ICategory';
import { Observable, EMPTY } from 'rxjs';

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
  public categories$: Observable<ICategory[]> = EMPTY;

  constructor(
    private auth: AuthService,
    private store: Store<fromStore.State>,
    private router: Router) {
      this.isAuth = false;
  }

  ngOnInit() {
    this.isAuth = this.auth.isAuth();
    this.categories$ = this.store.select(fromStore.getCategories);
  }

  filterProductsByCategory(categoryId: string) {
    this.store.dispatch(fromStore.SelectCategory({payload: categoryId}));
  }


  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
