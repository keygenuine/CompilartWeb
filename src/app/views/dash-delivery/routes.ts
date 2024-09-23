import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dash-delivery.component').then(m => m.DashDeliveryComponent),
    data: {
      title: `Delivery`
    }
  },

];

