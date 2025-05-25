import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from './main/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
