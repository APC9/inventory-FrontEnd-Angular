import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

export const loadCategories = createAction( '[Category Component] load Categories')

export const loadCategoriesSucces = createAction(
 '[Category Component] Load categories succes',
 props<{ categories: Category[] }>()
);

export const errorLoadCategories = createAction(
 '[Category Component] Error Load categories',
 props<{ payload: any }>()
);
