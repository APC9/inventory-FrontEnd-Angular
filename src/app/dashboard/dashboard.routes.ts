import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard.component';

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
            loadComponent: () => import( '../category/components/category/category.component').then( C => C.CategoryComponent )
          },
        ]
      }
    ]
  }

]
