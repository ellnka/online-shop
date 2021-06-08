import { Action, createReducer, on } from '@ngrx/store';
import * as catalogActions from '../actions/catalog.actions';
import { IProduct } from '../../../models/IProduct';
import { ICategory } from '../../../models/ICategory';

export interface CatalogState {
  products: IProduct[];
  product: IProduct;
  categories: ICategory[],
  loaded: boolean;
  loading: boolean;
  selectedCategoryId: string
}

export const initialState: CatalogState = {
  products: [],
  product: {name: ""},
  categories: [],
  loaded: false,
  loading: false,
  selectedCategoryId: ""
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

const loadProduct = (state: any, response: any) => {
  let product = response.payload;
  return {
    ...state,
    product,
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
    on(catalogActions.LoadCatalog, (state: any) => ({ ...state, loading: true })),
    on(catalogActions.LoadCatalogFail, (state: any) => ({ ...state, loaded: false, loading: false })), 
    on(catalogActions.LoadCatalogSuccess, loadProducts),
    on(catalogActions.LoadProductFail, (state: any) => ({ ...state, loaded: false, loading: false })), 
    on(catalogActions.LoadProductSuccess, loadProduct),
    on(catalogActions.LoadCategoriesSuccess, loadCategories),
    on(catalogActions.SelectCategory, (state: any, response: { payload: string; }) => ({  ...state, selectedCategoryId: response.payload})),
  );
  
export function reducer(state: CatalogState | undefined, action: Action) {
  return catalogReducer(state, action);
}

export const getCatalogLoading = (state: CatalogState) => state.loading;
export const getCatalogLoaded = (state: CatalogState) => state.loaded;
export const getProductEntities = (state: CatalogState) => state.products;
export const getCategories = (state: CatalogState) => state.categories;
export const getSelectedCategoryId = (state: CatalogState) => state.selectedCategoryId;


