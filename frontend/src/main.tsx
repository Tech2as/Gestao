import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import App from './main/App'
import { AuthProvider } from './contexts/AuthContext' // 👈 importe aqui

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> {/* 👈 envolve tudo */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)