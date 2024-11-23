import type React from 'react';
import type { ReactNode } from 'react';
import Navbar from './navbar/navbar';
import DesktopSidebar from './sidebar/desktop-sidebar';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="h-full">
      <div className="flex flex-row w-full h-full gap-2">
        <div className="bg-blue-200 w-1/5 h-full hidden md:flex">
          <DesktopSidebar />
        </div>
        <section className="w-full h-full flex flex-col">
          <Navbar />
          {children}
        </section>
      </div>
    </main>
  );
};

export default MainLayout;
