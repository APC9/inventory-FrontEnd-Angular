
import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { errorLoadCategories, loadCategories, loadCategoriesSucces, updateCategories, updateCategoriesError, updateCategoriesSucces } from './categories.actions';


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
  })),

  /* update */
  on( updateCategories, (state, { category}) =>{
    const updateCategory = state.categories.map( categ => categ.id === category.id ? { ...categ, ...category} : categ )
    return{
      ...state,
      categories: updateCategory,
      isLoading: true
    }
  }),

  on( updateCategoriesSucces, (state, { category}) =>{
    const updateCategory = state.categories.map( categ => categ.id === category.id ? { ...categ, ...category} : categ )
    return{
      ...state,
      categories: updateCategory,
      isLoading: false
    }
  }),

  on( updateCategoriesError, (state, {payload}) =>({
    ...state,
    errors: payload
  }))
);

export function categoriesReducer(state: categoriesState | undefined, action: Action) {
  return _categoriesReducer(state, action);
};


