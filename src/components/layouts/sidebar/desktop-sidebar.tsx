import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MENU_STRUCTURE } from '@/constants/sidebar/sidebar';
import CircularButton from '@/custom/svgs/circular-button';
import LogoSVG from '@/custom/svgs/logo-svg';
import type {
  DesktopSidebarProps,
  MenuGroupProps,
  MenuItemProps,
} from '@/types/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  href,
  isActive = false,
  isPinned,
  isDisabled = false,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    router.push(href);
  };

  return (
    <Button
      variant="ghost"
      className={`
        w-full justify-start items-center mb-1 relative overflow-hidden
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'text-muted-foreground group hover:bg-accent'}
      `}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-[hsl(var(--gradient-purple-start))] to-[hsl(var(--gradient-purple-end))]
          transition-opacity duration-500 ease-in-out
          shadow-sidebar-menu-shadow
          ${isActive && !isDisabled ? 'opacity-100' : 'opacity-0'}
        `}
      />
      <div
        className={`
          relative flex items-center w-full transition-all duration-500 ease-in-out
          ${!isPinned ? 'justify-center group-hover:justify-start' : ''}
        `}
      >
        <span
          className={`
            transition-colors duration-300 ease-in-out
            ${isActive && !isDisabled ? 'text-gray-50' : 'text-muted-foreground'}
          `}
        >
          {icon}
        </span>
        <span
          className={`
            ml-3 transition-all duration-500 ease-in-out whitespace-nowrap
            ${isActive && !isDisabled ? 'text-gray-50' : 'text-muted-foreground'}
            ${!isPinned ? 'hidden group-hover:inline-block' : ''}
          `}
        >
          {label}
        </span>
      </div>
    </Button>
  );
};

const MenuGroup: React.FC<MenuGroupProps> = ({ title, showTitle }) => (
  <div className="px-4 py-2">
    {showTitle ? (
      <h3 className="text-xs uppercase font-normal text-muted-foreground my-2 transition-opacity duration-500 ease-in-out">
        {title}
      </h3>
    ) : (
      <Separator
        orientation="horizontal"
        className="my-2 transition-opacity duration-500 ease-in-out"
      />
    )}
  </div>
);

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isPinned,
  onPinChange,
}) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const sidebarWidth = isPinned || isHovered ? 'wide' : 'narrow';
  const getPadding = () => (sidebarWidth === 'wide' ? 'px-4' : 'px-2');

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col h-full z-50 ${
        isPinned ? 'w-64' : 'w-16 hover:w-64 group'
      } transition-all duration-500 ease-in-out bg-card shadow-sidebar-menu-shadow`}
    >
      <div className="flex items-center justify-between py-6 px-4 w-full overflow-hidden border-b transition-all duration-500">
        <div className="flex flex-row items-center gap-3">
          <LogoSVG fill="hsl(245, 82%, 67%)" className="size-8" />
          <span
            className={`
              font-semibold whitespace-nowrap transition-all duration-500 ease-in-out
              ${isPinned ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}
            `}
          >
            Tripsy
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={onPinChange}
          className="w-fit h-fit p-0 justify-center hover:bg-transparent"
        >
          <CircularButton
            stroke="currentColor"
            strokeWidth={2}
            className={`transition-transform duration-500 ease-in-out ${isPinned ? 'rotate-0' : 'rotate-180'}`}
          />
        </Button>
      </div>

      <nav className={`flex-1 overflow-y-auto py-6 ${getPadding()}`}>
        {MENU_STRUCTURE.map((section, sectionIndex) => (
          <React.Fragment key={section.group || `section-${sectionIndex}`}>
            {section.group && (
              <MenuGroup
                title={section.group}
                showTitle={isPinned || isHovered}
              />
            )}
            {section.items.map((item) => (
              <MenuItem
                key={item.label}
                icon={<item.icon size={22} />}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                isPinned={isPinned}
                isDisabled={item.isDisabled}
              />
            ))}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
