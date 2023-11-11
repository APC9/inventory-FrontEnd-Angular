import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import * as actions from './products.actions';

export interface productsState{
  products: Product[],
  isLoading: boolean;
  error: null
}

export const initialState: productsState = {
  products: [],
  isLoading: false,
  error: null
}

const _productsReducer = createReducer(
  initialState,
  on( actions.loadproducts, (state) => ({ ...state, isLoading: true }) ),
  on( actions.loadproductsSucces, (state, {products}) => ({
    ...state,
    products: [...products],
    isLoading: false
  })),
  on( actions.errorLoadProducts, (state, {payload}) => ({
    ...state,
    error: payload,
  })),
);

export function productsReducer(state: productsState | undefined, action: Action) {
  return _productsReducer(state, action);
};


