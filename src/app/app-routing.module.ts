import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogPageComponent } from './catalog/components/pages/catalog-page/catalog-page.component';
import { NotFoundPageComponent } from './common/components/pages/not-found-page/not-found-page.component';
import { CatalogResolver } from './catalog/resolvers/catalog.resolver';
import { HomePageComponent } from './common/components/pages/home-page/home-page.component';
import { ProductResolver } from './catalog/resolvers/product.resolver';
import { ProductPageComponent } from './catalog/components/pages/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'catalog', component: CatalogPageComponent, pathMatch: 'full', resolve: { catalog: CatalogResolver } },
  { path: 'product/:id', component: ProductPageComponent, resolve: { product: ProductResolver }},
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
