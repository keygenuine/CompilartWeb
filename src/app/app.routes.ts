import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashGeral',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'dashDelivery',
        loadChildren: () => import('./views/dash-delivery/routes').then((m) => m.routes)
      },
      {
        path: 'dashComanda',
        loadChildren: () => import('./views/dash-comanda/routes').then((m) => m.routes)
      },
      {
        path: 'dashBalcao',
        loadChildren: () => import('./views/dash-balcao/routes').then((m) => m.routes)
      },
      {
        path: 'dashGeral',
        loadChildren: () => import('./views/dash-geral/routes').then((m) => m.routes)
      },
      {
        path: 'produtos',
        loadChildren: () => import('./views/produtos/routes').then((m) => m.routes)
      },
      {
        path: 'fornecedor',
        loadChildren: () => import('./views/fornecedor/routes').then((m) => m.routes)
      }

      // {
      //   path: 'pages',
      //   loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      // }
    ]
  },
  // {
  //   path: '404',
  //   loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: '500',
  //   loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },

  // {
  //   path: 'register',
  //   loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // { path: '**', redirectTo: 'dashboard' }
];
