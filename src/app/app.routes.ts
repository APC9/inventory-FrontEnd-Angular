import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.routes').then( r => r.DASHBOARD_ROUTES )
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
