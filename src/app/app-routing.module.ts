import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogPageComponent } from './catalog/components/pages/catalog-page/catalog-page.component';
import { NotFoundPageComponent } from './common/components/pages/not-found-page/not-found-page.component';
import { CatalogResolver } from './catalog/resolvers/catalog.resolver';
import { HomePageComponent } from './common/components/pages/home-page/home-page.component';
import { ProductResolver } from './catalog/resolvers/product.resolver';
import { ProductPageComponent } from './catalog/components/pages/product-page/product-page.component';
import { LoginPageComponent } from './common/components/pages/login-page/login-page.component';
import { AuthLayoutComponent } from './common/components/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './common/components/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './common/components/pages/register-page/register-page.component';
import { AuthGuard } from './common/guards/auth.guards';
import { OverviewPageComponent } from './profile/components/pages/overview-page/overview-page.component';
import { ProfileLayoutComponent } from './common/components/layouts/profile-layout/profile-layout.component';
import { ProfilePageComponent } from './profile/components/pages/profile-page/profile-page.component';
import { OrderHistoryPageComponent } from './profile/components/pages/order-history-page/order-history-page.component';
import { CrmPageComponent } from './common/components/pages/crm-page/crm-page.component';
import { CrmCategoriesPageComponent } from './common/components/pages/crm-categories-page/crm-categories-page.component';
import { CrmProductsPageComponent } from './common/components/pages/crm-products-page/crm-products-page.component';
import { CartPageComponent } from './common/components/pages/cart-page/cart-page.component';

const routes: Routes = [
  { path: 'auth', component: AuthLayoutComponent, children: [
    { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterPageComponent, pathMatch: 'full' }
  ]},
  { path: 'profile', component: ProfileLayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'overview', component: OverviewPageComponent, pathMatch: 'full'},
    { path: 'profile', component: ProfilePageComponent, pathMatch: 'full'},
    { path: 'order-history', component: OrderHistoryPageComponent, pathMatch: 'full'},
  ]},
  { path: '', component: SiteLayoutComponent, children: [
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    { path: 'catalog', component: CatalogPageComponent, pathMatch: 'full', resolve: { catalog: CatalogResolver } },
    { path: 'product/:id', component: ProductPageComponent, resolve: { product: ProductResolver }},
    { path: 'basket', component: CartPageComponent, pathMatch: 'full' },

    { path: 'crm', component: CrmPageComponent, pathMatch: 'full'},
    { path: 'crm/categories', component: CrmCategoriesPageComponent, pathMatch: 'full'},
    { path: 'crm/products', component: CrmProductsPageComponent, pathMatch: 'full'},

    { path: '**', component: NotFoundPageComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
