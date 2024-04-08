import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
// ** MUI Date Picker Localization & date-fns adapter
import { LocalizationProvider } from '@mui/x-date-pickers'
// or for moment
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
// ** Styled Components
import { Toaster } from 'react-hot-toast'
import './index.css'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <QueryClientProvider client={queryClient}>
            <App />
              <Toaster
                containerStyle={{ zIndex: '1800 !important' }}
                position={'bottom-center'}
                toastOptions={{ className: 'react-hot-toast', style: { zIndex: '1800 !important' } }}
              />
          </QueryClientProvider>
        </LocalizationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
