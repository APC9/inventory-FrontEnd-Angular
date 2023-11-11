import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import( './dashboard.component').then( C => C.DashboardComponent ),
        children:[
          {
            path: '',
            loadComponent: () => import( './components/home/home.component').then( C => C.HomeComponent )
          },
          {
            path: 'home',
            loadComponent: () => import( './components/home/home.component').then( C => C.HomeComponent )
          },
          {
            path: 'category',
            loadComponent: () => import( '../category/category/category.component').then( C => C.CategoryComponent )
          },
          {
            path: 'product',
            loadComponent: () => import( '../product/product/product.component').then( C => C.ProductComponent )
          },
        ]
      }
    ]
  }

]
