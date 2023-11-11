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
