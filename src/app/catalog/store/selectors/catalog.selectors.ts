import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromCatalog from '../reducers/catalog.reducer';
import { getRouterState } from './router.selectors';

import { IProduct } from '../../models/IProduct';
import { ICategory } from '../../models/ICategory';

const getCatalogState = (state: State) => state.catalog;

export const getCatalogLoaded = createSelector(getCatalogState, fromCatalog.getCatalogLoaded);
export const getCatalogLoading = createSelector(getCatalogState, fromCatalog.getCatalogLoading);
export const getAllProductEntities = createSelector(getCatalogState, fromCatalog.getProductEntities);
export const getAllCatalog = createSelector(getAllProductEntities, catalogObjectToArray);
export const getSelectedProduct = createSelector(getAllProductEntities, getRouterState, getProductFromRoute);

export const getCategories = createSelector(getAllProductEntities, getCategoriesFromCatalogObject);
export const getSelectedCategoryId = createSelector(getCatalogState, fromCatalog.getSelectedCategoryId);

function catalogObjectToArray(entities: {[id: number]: IProduct}): IProduct[] {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)])
}

function getProductFromRoute(entities: {[id: number]: IProduct}, router: any ): IProduct {
  return router.state && entities[router.state.params.id];
}

function getCategoriesFromCatalogObject(entities: {[id: number]: IProduct}): ICategory[] {
    debugger;
  const catalog = catalogObjectToArray(entities);
  const allCategories: ICategory[] = catalog?.map(catalog => catalog.category);
  const categories = [...new Map(allCategories?.map(item => [item.id, item])).values()];
  categories.unshift({id: 0, title: 'All'});
  return categories;
}
