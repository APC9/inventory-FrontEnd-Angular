
import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import * as actions from './categories.actions';


export interface categoriesState{
  categories: Category[],
  isLoading: boolean;
  error: null
}

export const initialState: categoriesState = {
  categories: [],
  isLoading: false,
  error: null
}


const _categoriesReducer = createReducer(
  initialState,
  on( actions.loadCategories, (state) => ({ ...state, isLoading: true }) ),
  on( actions.loadCategoriesSucces, (state, {categories}) => ({
    ...state,
    categories: [...categories],
    isLoading: false
  })),
  on( actions.errorLoadCategories, (state, {payload}) => ({
    ...state,
    error: payload,
  })),

  /* update */
  on( actions.updateCategories, (state, { category}) =>{
    const updateCategory = state.categories.map( categ => categ.id === category.id ? { ...categ, ...category} : categ )
    return{
      ...state,
      categories: updateCategory,
      isLoading: true
    }
  }),
  on( actions.updateCategoriesSucces, (state, { category}) =>{
    const updateCategory = state.categories.map( categ => categ.id === category.id ? { ...categ, ...category} : categ )
    return{
      ...state,
      categories: updateCategory,
      isLoading: false
    }
  }),
  on( actions.updateCategoriesError, (state, {payload}) =>({
    ...state,
    error: payload
  })),

  /* Delete */
  on( actions.deleteCategories, (state, { id }) =>({
    ...state,
    categories: state.categories.filter( categ => categ.id !== id),
    isLoading: true
  })),
  on( actions.deleteCategoriesSucces, (state, { id }) =>({
    ...state,
    categories: state.categories.filter( categ => categ.id !== id),
    isLoading: false
  })),
  on( actions.deleteCategoriesError, (state, {payload}) =>({
    ...state,
    error: payload
  })),
);

export function categoriesReducer(state: categoriesState | undefined, action: Action) {
  return _categoriesReducer(state, action);
};


