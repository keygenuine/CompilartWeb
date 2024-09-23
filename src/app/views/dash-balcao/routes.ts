import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash-balcao.component').then(m => m.DashBalcaoComponent),
    data: {
      title: `balcao`
    }
  },

];
