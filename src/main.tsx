import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { DataProvider } from './context/DataContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { SessionProgressProvider } from './context/SessionProgressContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <SessionProgressProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </SessionProgressProvider>
    </AuthProvider>
  </ThemeProvider>,
)
