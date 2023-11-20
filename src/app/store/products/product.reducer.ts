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

  /* update */
  on( actions.updateProduct, (state, { product }) =>{
    const updateProducts = state.products.map( prod => prod.id === product.id ? { ...prod, ...product} : prod )
    return{
      ...state,
      products: updateProducts,
      isLoading: true
    }
  }),
  on( actions.updateProductSucces, (state, { product }) =>{
    const updateProducts =  state.products.map( prod => prod.id === product.id ? { ...prod, ...product} : prod )
    return{
      ...state,
      products: updateProducts,
      isLoading: false
    }
  }),
  on( actions.updateProductError, (state, {payload}) =>({
    ...state,
    error: payload
  })),

  /* Load Product By Name */
  on( actions.loadProductByName, (state, { name }) =>({
    ...state,
    products: state.products.filter( prod => prod.name === name),
    isLoading: true
  })),
  on( actions.loadProductByNameSucces, (state, { product }) =>({
    ...state,
    products: [product],
    isLoading: false,
    error: null
  })),
  on( actions.loadProductByNameError, (state, {payload}) =>({
    ...state,
    error: payload
  })),

  /* Delete */
  on( actions.deleteProduct, (state, { id }) =>({
    ...state,
    products: state.products.filter( prod => prod.id !== id),
    isLoading: true
  })),
  on( actions.deleteProductSucces, (state, { id }) =>({
    ...state,
    products: state.products.filter( prod => prod.id !== id),
    isLoading: false
  })),
  on( actions.deleteProductError, (state, {payload}) =>({
    ...state,
    error: payload
  })),
);

export function productsReducer(state: productsState | undefined, action: Action) {
  return _productsReducer(state, action);
};


