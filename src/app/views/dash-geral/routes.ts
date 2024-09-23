import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash-geral.component').then(m => m.DashGeralComponent),
    data: {
      title: 'Geral'
    }
  },

];

