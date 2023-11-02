import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { CategoryService } from '../../services/category.service';
import * as categoriesActions from './categories.actions';
import { Category } from '../../models/category.model';


export class CategoriesEffects{

  private actions$ = inject(Actions);
  private categoryService = inject(CategoryService);

  loadCategories$ = createEffect( () => this.actions$
    .pipe(
       ofType( categoriesActions.loadCategories ),
       mergeMap( ()=> this.categoryService.getAllCategories()
        .pipe(
          map( (categories: Category[] ) => categoriesActions.loadCategoriesSucces({categories}) ),
          catchError( (error)=> of( categoriesActions.errorLoadCategories({payload: error}) ) )
        )
      )
    )
  )

  updateCategories$ = createEffect( () => this.actions$
    .pipe(
      ofType( categoriesActions.updateCategories ),
      mergeMap( ({category}) => this.categoryService.updateCategory(category)
        .pipe(
          map( (category: Category ) => categoriesActions.updateCategoriesSucces({category}) ),
          catchError( (error)=> of( categoriesActions.updateCategoriesError({ payload: error}) ))
        )
      )
    )
  )

}


