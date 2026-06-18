import { LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/lib/auth';

interface TapSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function TapSidebar({ activePage, onNavigate }: TapSidebarProps) {
  const { profile } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40">
      <div className="px-4 py-4 border-b border-border">
        <div className="w-[3px] h-8 rounded-full mb-2" style={{ backgroundColor: '#00FF63' }} />
        <p className="text-[14px] font-black uppercase tracking-[0.12em]">
          <span className="text-lm-dark">LM </span>
          <span style={{ color: '#00FF63' }}>TAP COACH</span>
        </p>
      </div>

      <nav className="flex-1 px-2 py-4">
        <button
          type="button"
          onClick={() => onNavigate('tap-dashboard')}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
            activePage === 'tap-dashboard' ? 'bg-lm-green-mid text-lm-dark' : 'text-lm-ink-mid hover:bg-lm-subtle'
          }`}
        >
          My Coaches
        </button>
      </nav>

      <Separator />

      <div className="p-4 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{profile?.name}</p>
          <p className="text-[11px] text-muted-foreground">TAP Coach</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-lm-dark hover:bg-lm-subtle"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default TapSidebar;
