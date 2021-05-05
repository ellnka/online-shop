import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogPageComponent } from './catalog/components/pages/catalog-page/catalog-page.component';
import { NotFoundPageComponent } from './common/pages/not-found-page/not-found-page.component';
import { CatalogResolver } from './catalog/resolvers/catalog.resolver';
import { HomePageComponent } from './common/pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: '\catalog', component: CatalogPageComponent, pathMatch: 'full', resolve: { catalog: CatalogResolver } },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
