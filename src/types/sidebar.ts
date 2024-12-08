import type { LucideIcon } from 'lucide-react';

export interface MenuSection {
  group?: string;
  items: Array<{
    icon: LucideIcon;
    label: string;
    href: string;
    isDisabled?: boolean;
  }>;
}

export interface DesktopSidebarProps {
  isPinned: boolean;
  onPinChange: () => void;
}

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isDisabled?: boolean;
  isActive?: boolean;
  isPinned: boolean;
}

export interface MenuGroupProps {
  title: string;
  showTitle: boolean;
}
