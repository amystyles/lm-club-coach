import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" />
      </svg>
    ),
  },
  {
    id: 'coach-path',
    label: 'Club Coach Path',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'development',
    label: 'Instructor Development',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
  },
  {
    id: 'roster',
    label: 'Instructor Team',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.656v2.656" />
      </svg>
    ),
  },
  {
    id: 'assessments',
    label: 'Assessments',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'feedback',
    label: 'Feedback Builder',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

type RoleType = 'Coach' | 'GFM' | 'Instructor';

export const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState<RoleType>('Coach');

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* ── Brand Zone ── */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        {!collapsed ? (
          <div className="flex items-center gap-3 min-w-0">
            {/* Green left bar + wordmark */}
            <div className="w-[3px] h-8 rounded-full flex-shrink-0" style={{ backgroundColor: '#00FF63' }} />
            <div className="min-w-0">
              <p className="text-[14px] font-black uppercase tracking-[0.12em] leading-none">
                <span className="text-lm-dark">LM CLUB </span>
                <span style={{ color: '#00FF63' }}>COACH</span>
              </p>
            </div>
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black mx-auto"
            style={{
              background: '#0A0A0A',
              color: '#00FF63',
              letterSpacing: '-0.03em',
            }}
          >
            LM
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-7 w-7 flex-shrink-0 flex items-center justify-center rounded-md text-lm-ink-muted hover:text-lm-dark hover:bg-lm-subtle transition-colors focus:outline-none"
        >
          {collapsed ? <Menu className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ── Nav Items ── */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 focus:outline-none ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-lm-green-mid text-lm-dark border-l-2 border-lm-green'
                  : 'text-lm-ink-mid hover:bg-lm-subtle hover:text-lm-dark border-l-2 border-transparent'
              }`}
            >
              {item.icon}
              {!collapsed && (
                <span className="text-sm font-medium leading-tight">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      <Separator />

      {/* ── Role Section ── */}
      <div className="p-4 space-y-2">
        {!collapsed ? (
          <>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Current Role
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border text-sm font-medium text-lm-dark hover:bg-lm-subtle transition-colors focus:outline-none">
                  {role}
                  <ChevronDown className="w-3.5 h-3.5 text-lm-ink-muted" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setRole('Coach')}>Coach</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole('GFM')}>GFM</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole('Instructor')}>Instructor</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-lm-subtle flex items-center justify-center text-xs font-bold text-lm-ink-mid">
              {role.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
