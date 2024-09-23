import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./produtos.component').then(m => m.ProdutosComponent),
    data: {
      title: `Produtos`
    }
  },

];

