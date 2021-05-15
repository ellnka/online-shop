import { Action, createReducer, on } from '@ngrx/store';
import * as catalogActions from '../actions/catalog.actions';
import { IProduct } from '../../../models/IProduct';
import { ICategory } from '../../../models/ICategory';
import { ProductService } from 'src/app/services/product.service';

export interface CatalogState {
  products: IProduct[];
  categories: ICategory[],
  loaded: boolean;
  loading: boolean;
  selectedCategoryId: number
}

export const initialState: CatalogState = {
  products: [],
  categories: [],
  loaded: false,
  loading: false,
  selectedCategoryId: 0
};


const loadProducts = (state: any, response: any) => {
  let products = response.payload;
  return {
    ...state,
    products,
    loaded: true,
    loading: false
  }
}

const loadCategories = (state: any, response: any) => {
  const categories: ICategory[] = response.payload;
  return {
    ...state,
    categories
  }
}

const catalogReducer = createReducer(
    initialState,
    on(catalogActions.LoadCatalog, state => ({ ...state, loading: true })),
    on(catalogActions.LoadCatalogFail, state => ({ ...state, loaded: false, loading: false })), 
    on(catalogActions.LoadCatalogSuccess, loadProducts),
    on(catalogActions.LoadCategoriesSuccess, loadCategories),
    on(catalogActions.SelectCategory, (state, response) => ({  ...state, selectedCategoryId: +response.payload})),
  );
  
export function reducer(state: CatalogState | undefined, action: Action) {
  return catalogReducer(state, action);
}

export const getCatalogLoading = (state: CatalogState) => state.loading;
export const getCatalogLoaded = (state: CatalogState) => state.loaded;
export const getProductEntities = (state: CatalogState) => state.products;
export const getCategories = (state: CatalogState) => state.categories;
export const getSelectedCategoryId = (state: CatalogState) => state.selectedCategoryId;


