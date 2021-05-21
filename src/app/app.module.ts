import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './catalog/components/product-list/product-list.component';
import { CatalogPageComponent } from './catalog/components/pages/catalog-page/catalog-page.component';
import { NotFoundPageComponent } from './common/components/pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './common/components/header/header.component';
import { ProductCardComponent } from './catalog/components/product-card/product-card.component';

import { reducers, effects, CustomSerializer } from "./catalog/store";
import { HomePageComponent } from './common/components/pages/home-page/home-page.component';
import { ProductDetailsComponent } from './catalog/components/product-details/product-details.component';
import { ProductPageComponent } from './catalog/components/pages/product-page/product-page.component';
import { LoginPageComponent } from './common/components/pages/login-page/login-page.component';
import { AuthLayoutComponent } from './common/components/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './common/components/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './common/components/pages/register-page/register-page.component';
import { TokenInterceptor } from './common/interceptors/token.interceptor';
import { OverviewPageComponent } from './profile/components/pages/overview-page/overview-page.component';
import { ProfileLayoutComponent } from './common/components/layouts/profile-layout/profile-layout.component';
import { ProfilePageComponent } from './profile/components/pages/profile-page/profile-page.component';
import { OrderHistoryPageComponent } from './profile/components/pages/order-history-page/order-history-page.component';
import { CrmPageComponent } from './common/components/pages/crm-page/crm-page.component';
import { CrmCategoriesPageComponent } from './common/components/pages/crm-categories-page/crm-categories-page.component';
import { CrmProductsPageComponent } from './common/components/pages/crm-products-page/crm-products-page.component';
import { CarouselComponent } from './common/components/carousel/carousel.component';
import { FilterCatalogPipe } from './catalog/pipes/filter-catalog.pipe';
import { CartPageComponent } from './common/components/pages/cart-page/cart-page.component';
import { CartItemComponent } from './common/components/cart/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CatalogPageComponent,
    NotFoundPageComponent,
    HeaderComponent,
    ProductCardComponent,
    HomePageComponent,
    ProductDetailsComponent,
    ProductPageComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    ProfileLayoutComponent,
    ProfilePageComponent,
    OrderHistoryPageComponent,
    CrmPageComponent,
    CrmCategoriesPageComponent,
    CrmProductsPageComponent,
    CarouselComponent,
    FilterCatalogPipe,
    CartPageComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer},
              {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
              {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
