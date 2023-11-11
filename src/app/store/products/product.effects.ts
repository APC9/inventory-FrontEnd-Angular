import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import * as productsActions from './products.actions';


export class productsEffects{

  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect( () => this.actions$
    .pipe(
       ofType( productsActions.loadproducts ),
       mergeMap( ()=> this.productService.getProducts()
        .pipe(
          map( (products: Product[] ) => productsActions.loadproductsSucces({products}) ),
          catchError( (error)=> of( productsActions.errorLoadProducts({payload: error}) ) )
        )
      )
    )
  )

};
