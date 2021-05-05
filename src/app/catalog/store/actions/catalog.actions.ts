import { createAction, props  } from '@ngrx/store';

import { IProduct } from '../../models/IProduct';

export const LoadCatalog = createAction('[Product] Load Catalog');
export const LoadCatalogFail = createAction('[Product] Load Catalog Fail', props<{ payload: any}>());
export const LoadCatalogSuccess = createAction('[Product] Load Catalog Success', props<{ payload: IProduct[]}>());
export const UpdateProduct = createAction('[Product] Update Product', props<{ payload: IProduct}>());
export const SelectCategory = createAction('[Product] Select Category', props<{ payload: number}>());
