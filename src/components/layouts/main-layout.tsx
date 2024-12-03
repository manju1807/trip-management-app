// MainLayout.tsx
'use client';

import { type ReactNode, useState } from 'react';
import Navbar from './navbar/navbar';
import DesktopSidebar from './sidebar/desktop-sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // States
  const [pinned, setPinned] = useState(true);

  // Callback functions for child components
  const handlePinned = () => setPinned(!pinned);

  return (
    <main className="h-full bg-background max-h-screen overflow-hidden">
      <div className="relative flex h-full">
        <div
          className={`
            h-full shadow-xl hidden md:flex 
            ${pinned ? 'relative' : 'absolute'}
          `}
        >
          <DesktopSidebar isPinned={pinned} onPinChange={handlePinned} />
        </div>
        <section
          className={`
            flex flex-col flex-1 transition-all 
            duration-300 max-w-[86rem] mx-auto py-2
          `}
        >
          <Navbar />
          {children}
        </section>
      </div>
    </main>
  );
};

export default MainLayout;
