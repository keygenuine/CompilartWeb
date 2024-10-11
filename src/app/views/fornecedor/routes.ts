import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./fornecedor.component').then(m => m.FornecedorComponent),
    data: {
      title: `Produtos`
    }
  },

];

