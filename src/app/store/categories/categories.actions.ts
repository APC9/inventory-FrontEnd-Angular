import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

/* loadCategories */

export const loadCategories = createAction( '[Category Component] load Categories')

export const loadCategoriesSucces = createAction(
 '[Category Component] Load categories succes',
 props<{ categories: Category[] }>()
);

export const errorLoadCategories = createAction(
 '[Category Component] Error Load categories',
 props<{ payload: any }>()
);


/* updateCategories */

export const updateCategories = createAction(
  '[Category Component] Update categories',
  props<{category: Category}>()
)

export const updateCategoriesSucces = createAction(
  '[Category Component] Update categories Succes',
  props<{ category: Category}>()
)

export const updateCategoriesError = createAction(
  '[Category Component] Update categories Error',
  props<{ payload: any }>()
)


