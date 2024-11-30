import type { MenuSection } from '@/types/sidebar';
import {
  Activity,
  AlertCircle,
  Fuel,
  Home,
  MapPin,
  Navigation,
  Route,
  Truck,
  Users,
} from 'lucide-react';

export const MENU_STRUCTURE: MenuSection[] = [
  {
    items: [{ icon: Home, label: 'Home', href: '/dashboard' }],
  },
  {
    group: 'TRACKING',
    items: [
      { icon: MapPin, label: 'Live Maps', href: '/dashboard/maps' },
      {
        icon: Navigation,
        label: 'Active Routes',
        href: '/dashboard/routes-management',
      },
    ],
  },
  {
    group: 'MANAGEMENT',
    items: [
      { icon: Route, label: 'Trips', href: '/dashboard/trips-management' },
      { icon: Truck, label: 'Vehicles', href: '/dashboard/vehicle-management' },
      { icon: Users, label: 'Drivers', href: '/dashboard/driver-management' },
    ],
  },
  {
    group: 'REPORTS',
    items: [
      {
        icon: Activity,
        label: 'Trip Activity',
        href: '/dashboard/reports/trip-activity',
      },
      {
        icon: AlertCircle,
        label: 'Trip Alerts',
        href: '/dashboard/reports/alerts',
      },
      {
        icon: Fuel,
        label: 'Fuel & Maintenance',
        href: '/dashboard/reports/maintenance',
      },
    ],
  },
];
