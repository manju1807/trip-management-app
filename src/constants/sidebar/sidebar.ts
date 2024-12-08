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

// Update the MenuSection type to include isDisabled
declare module '@/types/sidebar' {
  interface MenuItem {
    icon: any;
    label: string;
    href: string;
    isDisabled?: boolean;
  }
}

export const MENU_STRUCTURE: MenuSection[] = [
  {
    items: [{ icon: Home, label: 'Home', href: '/', isDisabled: false }],
  },
  {
    group: 'TRACKING',
    items: [
      {
        icon: MapPin,
        label: 'Live Maps',
        href: '/dashboard/maps',
        isDisabled: false,
      },
      {
        icon: Navigation,
        label: 'Active Routes',
        href: '/dashboard/routes-management',
        isDisabled: true, // Disabled for demonstration
      },
    ],
  },
  {
    group: 'MANAGEMENT',
    items: [
      {
        icon: Users,
        label: 'Drivers',
        href: '/dashboard/driver-management',
        isDisabled: true,
      },
      {
        icon: Truck,
        label: 'Vehicles',
        href: '/dashboard/vehicle-management',
        isDisabled: true,
      },
      {
        icon: Route,
        label: 'Trips',
        href: '/dashboard/trips-management',
        isDisabled: true,
      }, // Disabled for demonstration
    ],
  },
  {
    group: 'REPORTS',
    items: [
      {
        icon: Activity,
        label: 'Trip Activity',
        href: '/dashboard/reports/trip-activity',
        isDisabled: false,
      },
      {
        icon: AlertCircle,
        label: 'Trip Alerts',
        href: '/dashboard/reports/alerts',
        isDisabled: false, // Disabled for demonstration
      },
      {
        icon: Fuel,
        label: 'Fuel & Maintenance',
        href: '/dashboard/reports/maintenance',
        isDisabled: false, // Disabled for demonstration
      },
    ],
  },
];
