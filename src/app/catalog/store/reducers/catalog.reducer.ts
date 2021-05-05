import { Action, createReducer, on } from '@ngrx/store';
import * as catalogActions from '../actions/catalog.actions';
import { IProduct } from '../../models/IProduct';

export interface CatalogState {
  entities: {[id: number]: IProduct};
  loaded: boolean;
  loading: boolean;
  selectedCategoryId: number
}

export const initialState: CatalogState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedCategoryId: 0
};


const loadCatolog = (state: any, response: any) => {
  const catalog = response.payload;
  const entities = catalog.reduce(
    (entities: {[id: number]: IProduct}, product: IProduct) => {
        return {
          ...entities,
          [product.id]: product
        }
      }, { ...state.entities });

    return {
      ...state,
      entities,
      loaded: true,
      loading: false
   }
}

const updateCatalog = (state: any, response: any) => {
    const product = response.payload;
    const entities = { ...state.entities };
    entities[product.id] = product;
    return {
        ...state,
        entities
    }
}

const catalogReducer = createReducer(
    initialState,
    on(catalogActions.LoadCatalog, state => ({ ...state, loading: true })),
    on(catalogActions.LoadCatalogFail, state => ({ ...state, loaded: false, loading: false })), 
    on(catalogActions.LoadCatalogSuccess, loadCatolog),
    on(catalogActions.UpdateProduct, updateCatalog),
    on(catalogActions.SelectCategory, (state, response) => ({  ...state, selectedCategoryId: +response.payload})),
  );
  
export function reducer(state: CatalogState | undefined, action: Action) {
  return catalogReducer(state, action);
}


export const getCatalogLoading = (state: CatalogState) => state.loading;
export const getCatalogLoaded = (state: CatalogState) => state.loaded;
export const getProductEntities = (state: CatalogState) => state.entities;
export const getSelectedCategoryId = (state: CatalogState) => state.selectedCategoryId;


