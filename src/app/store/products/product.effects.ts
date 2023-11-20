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

  updateProduct$ = createEffect( () => this.actions$
    .pipe(
      ofType( productsActions.updateProduct ),
      mergeMap( ({product, file}) => this.productService.updateProduct(product, file)
        .pipe(
          map( (product: Product ) => productsActions.updateProductSucces({product}) ),
          catchError( (error)=> of( productsActions.updateProductError({ payload: error}) ))
        )
      )
    )
  )

  laadProductByName$ = createEffect( () => this.actions$
    .pipe(
      ofType( productsActions.loadProductByName ),
      mergeMap( ({name}) => this.productService.getProductByName(name)
        .pipe(
          map((product: Product ) => productsActions.loadProductByNameSucces({product}) ),
          catchError( (error)=> of( productsActions.loadProductByNameError({ payload: error}) ))
        )
      )
    )
  )

  deleteProduct$ = createEffect( () => this.actions$
    .pipe(
      ofType( productsActions.deleteProduct ),
      mergeMap( ({id}) => this.productService.deleteProductById(id)
        .pipe(
          map( () => productsActions.deleteProductSucces({id}) ),
          catchError( (error)=> of( productsActions.deleteProductError({ payload: error}) ))
        )
      )
    )
  )

};
