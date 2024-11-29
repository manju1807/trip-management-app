import type { MenuSection } from '@/types/sidebar';
import {
  Activity,
  Bell,
  Building2,
  Flag,
  Fuel,
  Home,
  Map as MapIcon,
  Truck,
  User2,
} from 'lucide-react';

export const MENU_STRUCTURE: MenuSection[] = [
  {
    items: [
      { icon: Home, label: 'Home', href: '/' },
      { icon: Building2, label: 'Distillery', href: '/distillery' },
    ],
  },
  {
    group: 'SUMMARY',
    items: [{ icon: MapIcon, label: 'Maps', href: '/maps' }],
  },
  {
    group: 'MANAGEMENT',
    items: [
      { icon: Flag, label: 'Trips', href: '/trips' },
      { icon: Truck, label: 'Vehicles', href: '/vehicle-management' },
      { icon: User2, label: 'Drivers', href: '/driver-management' },
    ],
  },
  {
    group: 'REPORTS',
    items: [
      { icon: Activity, label: 'Trip Activity', href: '/trip-activity' },
      { icon: Bell, label: 'Trip Alerts', href: '/trip-alerts' },
      { icon: Fuel, label: 'Fuel & Maintenance', href: '/fuel-maintenance' },
    ],
  },
];
