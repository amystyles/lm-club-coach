import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  pageTitle: string;
  subtitle?: string;
}

export const AppLayout = ({
  children,
  activePage,
  onNavigate,
  pageTitle,
  subtitle,
}: AppLayoutProps) => {
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      {/* Top Bar */}
      <TopBar pageTitle={pageTitle} subtitle={subtitle} />

      {/* Main Content Area */}
      <main
        className={`fixed top-14 bottom-0 right-0 overflow-y-auto transition-all duration-300 ${
          sidebarCollapsed ? 'left-16' : 'left-64'
        }`}
      >
        <div className="p-6 bg-background">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
