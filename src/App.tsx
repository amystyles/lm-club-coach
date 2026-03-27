import { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import TeamRoster from './pages/TeamRoster';
import { InstructorProfile } from './pages/InstructorProfile';
import AssessmentCenter from './pages/AssessmentCenter';
import DevelopmentPathway from './pages/DevelopmentPathway';
import ClubCoachPath from './pages/ClubCoachPath';
import LMQReference from './pages/LMQReference';
import FeedbackBuilder from './pages/FeedbackBuilder';

const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Team overview & instructor development' },
  roster: { title: 'Team Roster', subtitle: 'All instructors at a glance' },
  assessments: { title: 'Assessment Centre', subtitle: 'Observations, certifications & grade reviews' },
  development: { title: 'Development Pathway', subtitle: 'From Day One to World-Class' },
  'coach-path': { title: 'Club Coach Path', subtitle: 'Your development as a Club Coach' },
  'lmq-reference': { title: 'LMQ Reference', subtitle: 'Levels, grades & key elements' },
  feedback: { title: 'Feedback Builder', subtitle: 'CRC & GROW guided tools' },
  profile: { title: 'Instructor Profile', subtitle: 'Individual development view' },
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);

  const handleViewInstructor = (id: string) => {
    setSelectedInstructorId(id);
    setActivePage('profile');
  };

  const handleBackFromProfile = () => {
    setActivePage('dashboard');
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
        return <Dashboard onViewInstructor={handleViewInstructor} />;
      case 'roster':
        return <TeamRoster onViewInstructor={handleViewInstructor} />;
      case 'assessments':
        return <AssessmentCenter />;
      case 'development':
        return <DevelopmentPathway />;
      case 'coach-path':
        return <ClubCoachPath />;
      case 'lmq-reference':
        return <LMQReference />;
      case 'feedback':
        return <FeedbackBuilder />;
      case 'profile':
        return selectedInstructorId ? (
          <InstructorProfile
            instructorId={selectedInstructorId}
            onBack={handleBackFromProfile}
          />
        ) : (
          <Dashboard onViewInstructor={handleViewInstructor} />
        );
      default:
        return <Dashboard onViewInstructor={handleViewInstructor} />;
    }
  };

  return (
    <div className="dark">
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
