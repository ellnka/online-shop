import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProductListComponent } from './catalog/components/product-list/product-list.component';
import { CatalogPageComponent } from './catalog/components/pages/catalog-page/catalog-page.component';
import { NotFoundPageComponent } from './common/components/pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './common/components/header/header.component';
import { ProductCardComponent } from './catalog/components/product-card/product-card.component';

import { reducers, effects, CustomSerializer } from "./catalog/store";
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HomePageComponent } from './common/components/pages/home-page/home-page.component';
import { ProductDetailsComponent } from './catalog/components/product-details/product-details.component';
import { ProductPageComponent } from './catalog/components/pages/product-page/product-page.component';

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
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
