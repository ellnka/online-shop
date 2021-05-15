import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromCatalog from '../reducers/catalog.reducer';
import { getRouterState } from './router.selectors';

import { IProduct } from '../../../models/IProduct';
import { ICategory } from '../../../models/ICategory';

const getCatalogState = (state: State) => state.catalog;

export const getCatalogLoaded = createSelector(getCatalogState, fromCatalog.getCatalogLoaded);
export const getCatalogLoading = createSelector(getCatalogState, fromCatalog.getCatalogLoading);
export const getAllProductEntities = createSelector(getCatalogState, fromCatalog.getProductEntities);
export const getSelectedProduct = createSelector(getAllProductEntities, getRouterState, getProductFromRoute);

export const getCategories = createSelector(getCatalogState, fromCatalog.getCategories);
export const getSelectedCategoryId = createSelector(getCatalogState, fromCatalog.getSelectedCategoryId);


function getProductFromRoute(products: IProduct[], router: any ): IProduct {
  const index = products.findIndex(product => product._id === router.state.params.id)
  return router.state && products[index];
}