import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { DataProvider } from './context/DataContext.tsx'
import { SessionProgressProvider } from './context/SessionProgressContext.tsx'
import { CustomSessionsProvider } from './context/CustomSessionsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CustomSessionsProvider>
      <SessionProgressProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </SessionProgressProvider>
    </CustomSessionsProvider>
  </AuthProvider>,
)
