
import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { errorLoadCategories, loadCategories, loadCategoriesSucces } from './categories.actions';


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
  on( loadCategories, (state) => ({ ...state, isLoading: true }) ),
  on( loadCategoriesSucces, (state, {categories}) => ({
    ...state,
    categories: [...categories],
  })),
  on( errorLoadCategories, (state, {payload}) => ({
    ...state,
    error: payload,
  }))
);

export function categoriesReducer(state: categoriesState | undefined, action: Action) {
  return _categoriesReducer(state, action);
};


