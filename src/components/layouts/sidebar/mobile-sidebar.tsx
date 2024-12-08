import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetClose } from '@/components/ui/sheet';
import { MENU_STRUCTURE } from '@/constants/sidebar/sidebar';
import LogoSVG from '@/custom/svgs/logo-svg';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isDisabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  href,
  isActive = false,
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
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'text-muted-foreground hover:bg-accent'}
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
      <div className="relative flex items-center w-full">
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
            ml-3 transition-all duration-300 ease-in-out
            ${isActive && !isDisabled ? 'text-gray-50' : 'text-muted-foreground'}
          `}
        >
          {label}
        </span>
      </div>
    </Button>
  );
};

const MenuGroup: React.FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-1">
    {' '}
    {/* Reduced padding for better spacing */}
    <h3 className="text-xs uppercase font-normal text-muted-foreground my-2">
      {title}
    </h3>
  </div>
);

const MobileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header Section */}
      <div className="flex items-center justify-between py-4 px-4 w-full border-b">
        <div className="flex items-center gap-3">
          <LogoSVG fill="hsl(245, 82%, 67%)" className="size-8" />
          <span className="font-semibold">Tripsy</span>
        </div>
        <SheetClose />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-4">
        {MENU_STRUCTURE.map((section, sectionIndex) => (
          <React.Fragment key={section.group || `section-${sectionIndex}`}>
            {section.group ? (
              <MenuGroup title={section.group} />
            ) : (
              sectionIndex > 0 && (
                <Separator orientation="horizontal" className="my-2" />
              )
            )}
            {section.items.map((item) => (
              <MenuItem
                key={item.label}
                icon={<item.icon size={22} />}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                isDisabled={item.isDisabled}
              />
            ))}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default MobileSidebar;
