import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash-comanda.component').then(m => m.DashComandaComponent),
    data: {
      title: `comanda`
    }
  },

];
