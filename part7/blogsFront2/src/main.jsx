import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import { NotificationContextProvider } from './contexts/NotificationContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </StrictMode>
)
