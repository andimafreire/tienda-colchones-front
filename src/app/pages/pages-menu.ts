import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Destacados',
    icon: 'star-outline',
    link: '/',
    skipLocationChange: true,
    home: true,
  },
  {
    title: 'Colchones',
    icon: 'clipboard-outline',
    link: '/colchones',
    skipLocationChange: true,
  },
  {
    title: 'Somieres',
    icon: 'layout-outline',
    link: '/somieres',
    skipLocationChange: true,
  }
];