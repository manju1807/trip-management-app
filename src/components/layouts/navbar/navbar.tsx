'use client';

import { ThemeToggle } from '@/components/features/theme-toggle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Menu, Search } from 'lucide-react';
import {
  ClipboardList,
  Home,
  Map as MapIcon, // Renamed to MapIcon to avoid shadowing global Map
  Navigation,
  Route,
  Truck,
  User,
  Users,
} from 'lucide-react';
import React from 'react';
import MobileSidebar from '../sidebar/mobile-sidebar';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const quickSettings = [
    { id: 'home', Icon: Home, label: 'Home' },
    { id: 'trips-summary', Icon: Route, label: 'Trips Summary' },
    { id: 'list', Icon: ClipboardList, label: 'List' },
    { id: 'driver-list', Icon: Users, label: 'Driver List' },
  ];

  const managementOptions = [
    { id: 'fleet-management', Icon: Truck, label: 'Fleet Management' },
    { id: 'driver-management', Icon: User, label: 'Driver Management' },
    { id: 'trip-management', Icon: MapIcon, label: 'Trip Management' },
    { id: 'route-management', Icon: Navigation, label: 'Route Management' },
  ];

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-card shadow-custom-nav m-2 rounded-md">
        {/* Left side - Search */}
        <div className="flex-1 max-w-xl">
          <div className="flex flex-row gap-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={'ghost'}
                  className="text-sm text-muted-foreground px-2.5 py-1 md:hidden"
                >
                  <Menu className="size-5 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <MobileSidebar />
              </SheetContent>
            </Sheet>
            <Button
              variant={'ghost'}
              className="text-sm text-muted-foreground px-2.5 py-1 flex flex-row gap-1 items-center"
              onClick={() => setOpen(true)}
            >
              <Search className="size-5 text-foreground mr-2" />
              <span className="hidden md:flex">Search (Ctrl+/)</span>
            </Button>
          </div>
        </div>
        {/* Right side - Theme Toggle and Sign Out */}
        <div className="flex items-center ml-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </nav>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full h-full sm:max-w-xl sm:h-2/3 p-0">
          <div className="flex flex-col w-full">
            {/* Search Input */}
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                className="flex h-16 w-full rounded-md bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0"
                placeholder="Type a command or search..."
                aria-label="Search"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] h-full w-full place-content-center gap-8">
              {/* Quick Settings Section */}
              <div className="flex flex-col items-start pl-16">
                <h4 className="mb-4 text-sm font-medium leading-none text-muted-foreground">
                  QUICK SETTINGS
                </h4>
                <div className="space-y-2 text-muted-foreground">
                  {quickSettings.map(({ id, Icon, label }) => (
                    <Button
                      key={id} // Use id as the key instead of index
                      variant="ghost"
                      className="w-full justify-start gap-3 pl-0 hover:bg-background hover:text-accent-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <Separator
                className="hidden md:flex h-full"
                orientation="vertical"
              />
              <Separator
                className="flex md:hidden w-96 mx-auto"
                orientation="horizontal"
              />

              {/* Management Section */}
              <div className="flex flex-col items-start pl-16 md:pl-0">
                <h4 className="mb-4 text-sm font-medium leading-none text-muted-foreground">
                  MANAGEMENT
                </h4>
                <div className="space-y-2 text-muted-foreground">
                  {managementOptions.map(({ id, Icon, label }) => (
                    <Button
                      key={id} // Use id as the key instead of index
                      variant="ghost"
                      className="w-full justify-start gap-3 pl-0 hover:bg-background hover:text-accent-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
