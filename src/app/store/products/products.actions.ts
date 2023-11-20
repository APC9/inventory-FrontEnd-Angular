import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadproducts = createAction( '[Product Component] load products')

export const loadproductsSucces = createAction(
 '[Product Component] Load products succes',
 props<{ products: Product[] }>()
);

export const errorLoadProducts = createAction(
 '[Product Component] Error Load products',
 props<{ payload: any }>()
);

/* updateProduct */
export const updateProduct = createAction(
  '[Product Component] Update Product',
  props<{product: Product, file?: any }>()
)

export const updateProductSucces = createAction(
  '[Product Component] Update Product Succes',
  props<{ product: Product, file?: any }>()
)

export const updateProductError = createAction(
  '[Product Component] Update Product Error',
  props<{ payload: any }>()
)

/* Load Product By Name */
export const loadProductByName = createAction(
  '[Product Component] load Product by Name',
  props<{ name: string }>()
)
export const loadProductByNameSucces = createAction(
  '[Product Component] load Product by Name Succes',
  props<{ product: Product }>()
)
export const loadProductByNameError = createAction(
  '[Product Component] load Product by Name Error',
  props<{ payload: any }>()
)

/* deleteProduct */
export const deleteProduct = createAction(
  '[Product Component] Delete Product',
  props<{ id: number }>()
)
export const deleteProductSucces = createAction(
  '[Product Component] Delete Product Succes',
  props<{ id: number }>()
)
export const deleteProductError = createAction(
  '[Product Component] Delete Product Error',
  props<{ payload: any }>()
)
