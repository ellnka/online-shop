import { createAction, props  } from '@ngrx/store';

import { IProduct } from '../../../models/IProduct';
import { ICategory } from '../../../models/ICategory';

export const LoadCatalog = createAction('[Product] Load Catalog');
export const LoadProduct = createAction('[Product] Load Product', props<{payload: IProduct}>());
export const LoadCatalogFail = createAction('[Product] Load Catalog Fail', props<{ payload: any}>());
export const LoadCatalogSuccess = createAction('[Product] Load Products Success', props<{ payload: IProduct[]}>());
export const LoadProductFail = createAction('[Product] Load Product Fail', props<{ payload: any}>());
export const LoadProductSuccess = createAction('[Product] Load Product Success', props<{ payload: IProduct}>());
export const LoadCategoriesSuccess = createAction('[Product] Load Categories Success', props<{ payload: ICategory[]}>());
export const UpdateProduct = createAction('[Product] Update Product', props<{ payload: IProduct}>());
export const SelectCategory = createAction('[Product] Select Category', props<{ payload: string}>());
