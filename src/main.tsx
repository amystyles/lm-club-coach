import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { DataProvider } from './context/DataContext.tsx'
import { SessionProgressProvider } from './context/SessionProgressContext.tsx'
import { CustomSessionsProvider } from './context/CustomSessionsContext.tsx'
import { CoachPathEnrollmentProvider } from './context/CoachPathEnrollmentContext.tsx'
import { ClubCoachRosterProvider } from './context/ClubCoachRosterContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CustomSessionsProvider>
      <SessionProgressProvider>
        <CoachPathEnrollmentProvider>
          <ClubCoachRosterProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </ClubCoachRosterProvider>
        </CoachPathEnrollmentProvider>
      </SessionProgressProvider>
    </CustomSessionsProvider>
  </AuthProvider>,
)
