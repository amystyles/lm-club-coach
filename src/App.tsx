import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useSessionProgress } from './context/SessionProgressContext';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ClubPicker from './pages/ClubPicker';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import TeamRoster from './pages/TeamRoster';
import { InstructorProfile } from './pages/InstructorProfile';
import AssessmentCenter from './pages/AssessmentCenter';
import DevelopmentPathway from './pages/DevelopmentPathway';
import ClubCoachPath from './pages/ClubCoachPath';
import LMQReference from './pages/LMQReference';
import FeedbackBuilder from './pages/FeedbackBuilder';
import SignUp from './pages/SignUp';
import TapCoachDashboard from './pages/TapCoachDashboard';
import LmusAdminPanel from './pages/LmusAdminPanel';
import { TapSidebar } from './components/layout/TapSidebar';

const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Team overview & instructor development' },
  roster: { title: 'Instructor Team', subtitle: 'All instructors at a glance' },
  assessments: { title: 'Assessment Centre', subtitle: 'Observations, certifications & grade reviews' },
  development: { title: 'Development Pathway', subtitle: 'From Day One to World-Class' },
  'coach-path': { title: 'Club Coach Path', subtitle: 'Your development journey' },
  'lmq-reference': { title: 'LMQ Reference', subtitle: 'Levels, grades & key elements' },
  feedback: { title: 'Feedback Builder', subtitle: 'CRC & GROW guided tools' },
  profile: { title: 'Instructor Profile', subtitle: 'Individual development view' },
  'add-coach': { title: 'Add Coach Account', subtitle: 'Create a new Club Coach, GFM, or TAP Coach account' },
  'lmus-admin': { title: 'LMUS Admin', subtitle: 'TAP AP enrollment & assignments' },
  'tap-dashboard': { title: 'TAP Coach', subtitle: 'Assigned coaches & sign-offs' },
};

function App() {
  const { user, clubs, activeClub, loading, isRecovery, isLmusAdmin, isTapCoach, profile } = useAuth();
  const { confirmedSessionIds, statusBySessionId, markPrepped, refresh: refreshProgress } = useSessionProgress();
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<'dashboard' | 'roster'>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading…</div>
      </div>
    );
  }

  if (isRecovery) return <ResetPassword />;
  if (!user) return <Login />;

  if (isTapCoach) {
    const tapPage = activePage === 'tap-dashboard' ? 'tap-dashboard' : 'tap-dashboard';
    const pageInfo = PAGE_TITLES[tapPage];
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <TapSidebar activePage={tapPage} onNavigate={setActivePage} />
        <main className="fixed top-0 bottom-0 right-0 left-64 overflow-y-auto bg-background">
          <div className="px-6 py-8 border-b border-border bg-card">
            <h1 className="text-xl font-bold text-lm-dark">{pageInfo.title}</h1>
            {pageInfo.subtitle && <p className="text-sm text-muted-foreground mt-1">{pageInfo.subtitle}</p>}
          </div>
          <div className="p-6">
            <TapCoachDashboard />
          </div>
        </main>
      </div>
    );
  }

  if (!activeClub && clubs.length > 1) return <ClubPicker />;

  const coachProgressKey = user?.id ?? 'coach-path';
  const coachConfirmedIds = confirmedSessionIds[coachProgressKey] ?? [];

  const handleMarkPrepped = async (sessionId: string) => {
    await markPrepped('coach-path', sessionId);
    await refreshProgress();
  };

  const handleViewInstructor = (id: string, source: 'dashboard' | 'roster' = 'dashboard') => {
    setSelectedInstructorId(id);
    setPreviousPage(source);
    setActivePage('profile');
  };

  const handleBackFromProfile = () => {
    setActivePage(previousPage);
    setSelectedInstructorId(null);
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    if (page !== 'profile') {
      setSelectedInstructorId(null);
    }
  };

  const pageInfo = PAGE_TITLES[activePage] || { title: 'LM Club Coach' };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')}
            completedSessionIds={confirmedSessionIds}
            onNavigate={handleNavigate}
            coachProfile={profile}
          />
        );
      case 'roster':
        return <TeamRoster onViewInstructor={(id) => handleViewInstructor(id, 'roster')} />;
      case 'assessments':
        return <AssessmentCenter />;
      case 'development':
        return <DevelopmentPathway onNavigate={handleNavigate} />;
      case 'coach-path':
        return (
          <ClubCoachPath
            onNavigate={handleNavigate}
            confirmedSessionIds={coachConfirmedIds}
            statusBySessionId={statusBySessionId}
            onMarkPrepped={handleMarkPrepped}
          />
        );
      case 'lmq-reference':
        return <LMQReference />;
      case 'feedback':
        return <FeedbackBuilder />;
      case 'lmus-admin':
        return isLmusAdmin ? <LmusAdminPanel /> : (
          <Dashboard
            onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')}
            completedSessionIds={confirmedSessionIds}
            onNavigate={handleNavigate}
            coachProfile={profile}
          />
        );
      case 'add-coach':
        return isLmusAdmin ? (
          <SignUp onBack={() => handleNavigate('roster')} />
        ) : (
          <Dashboard
            onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')}
            completedSessionIds={confirmedSessionIds}
            onNavigate={handleNavigate}
            coachProfile={profile}
          />
        );
      case 'profile':
        return selectedInstructorId ? (
          <InstructorProfile
            instructorId={selectedInstructorId}
            onBack={handleBackFromProfile}
            source={previousPage}
          />
        ) : (
          <Dashboard
            onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')}
            completedSessionIds={confirmedSessionIds}
            onNavigate={handleNavigate}
            coachProfile={profile}
          />
        );
      default:
        return (
          <Dashboard
            onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')}
            completedSessionIds={confirmedSessionIds}
            onNavigate={handleNavigate}
            coachProfile={profile}
          />
        );
    }
  };

  return (
    <div>
      <AppLayout
        activePage={activePage}
        onNavigate={handleNavigate}
        pageTitle={pageInfo.title}
        subtitle={pageInfo.subtitle}
      >
        {renderPage()}
      </AppLayout>
    </div>
  );
}

export default App;
