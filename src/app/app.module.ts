import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { StripeCheckout, StripeModule } from 'ngx-stripe-checkout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './catalog/components/product-list/product-list.component';
import { CatalogPageComponent } from './catalog/components/pages/catalog-page/catalog-page.component';
import { NotFoundPageComponent } from './common/components/pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './common/components/header/header.component';
import { ProductCardComponent } from './catalog/components/product-card/product-card.component';

import { catalogReducers, catalogEffects } from "./catalog/store";
import { recipesReducers, recipesEffects } from "./recipes/store";
import { CustomSerializer } from './store/router.selectors';

import { HomePageComponent } from './common/components/pages/home-page/home-page.component';
import { ProductDetailsComponent } from './catalog/components/product-details/product-details.component';
import { ProductPageComponent } from './catalog/components/pages/product-page/product-page.component';
import { LoginPageComponent } from './common/components/pages/login-page/login-page.component';
import { AuthLayoutComponent } from './common/components/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './common/components/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './common/components/pages/register-page/register-page.component';
import { TokenInterceptor } from './common/interceptors/token.interceptor';
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
import { CheckoutComponent } from './common/components/cart/checkout/checkout.component';
import { DeliveryComponent } from './common/components/cart/delivery/delivery.component';
import { AddressAutoCompleteComponent } from './common/components/cart/address-auto-complete/address-auto-complete.component';
import { PaymentComponent } from './common/components/cart/payment/payment.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchComponent } from './common/components/search/search.component';
import { FilterHighlightDirective } from './directives/filter-highlight.directive';
import { RecipesPageComponent } from './recipes/components/pages/recipes-page/recipes-page.component';
import { RecipesListComponent } from './recipes/components/recipes-list/recipes-list.component';
import { RecipeCardComponent } from './recipes/components/recipe-card/recipe-card.component';
import { RecipeDetailsComponent } from './recipes/components/recipe-details/recipe-details.component';
import { RecipePageComponent } from './recipes/components/pages/recipe-page/recipe-page.component';
import { AccordionComponent } from './common/components/accordion/accordion.component';
import { AccordionGroupComponent } from './common/components/accordion/accordion-group.component';

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
    CheckoutComponent,
    DeliveryComponent,
    AddressAutoCompleteComponent,
    PaymentComponent,
    FilterPipe,
    SearchComponent,
    FilterHighlightDirective,
    RecipesPageComponent,
    RecipesListComponent,
    RecipeCardComponent,
    RecipeDetailsComponent,
    RecipePageComponent,
    AccordionComponent,
    AccordionGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot(catalogEffects.concat(recipesEffects)),
    StoreModule.forRoot({catalog: catalogReducers, recipes: recipesReducers, router: routerReducer}),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule,
    GooglePlaceModule,
    StripeModule,
  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer},
              {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
              {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'},
              StripeCheckout],
  bootstrap: [AppComponent]
})
export class AppModule { }
