import { INavData } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
let icon = freeSet
export const navItems: INavData[] = [
  {
    title: true,
    name: 'Vendas'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Venda Delivery',
        url: '/dashDelivery',
        iconComponent:{ name: 'cilTruck' }
      },
      {
        name: 'Venda Comanda',
        url: '/dashComanda',
        icon: 'cil-fastfood'
      },
      {
        name: 'Venda Balcao',
        url: '/dashBalcao',
        icon: 'cil-fastfood'
      },
      {
        name: 'Venda Geral',
        url: '/dashGeral',
        icon: 'cil-fastfood'
      }
    ],
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Perfil'
  },

  {
    name: 'Cadastros',
    url: '/dashboard',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Produtos',
        url: '/produtos',
      },
      {
        name: 'Fornecedores',
        url: '/fornecedor',
      },
    ]
  },

];
