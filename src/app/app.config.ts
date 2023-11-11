import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { CategoriesEffects } from './store/categories/categories.effects';
import { productsEffects } from './store/products/product.effects';

import { categoriesReducer } from './store/categories/categories.reducer';
import { productsReducer } from './store/products/product.reducer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideAnimations(),

    /* NgRx */
    provideStore({
      categories: categoriesReducer,
      products: productsReducer
    }),
    provideEffects( CategoriesEffects, productsEffects ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
