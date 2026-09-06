import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CefrProvider } from './contexts/CefrContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CefrProvider>
        <App />
      </CefrProvider>
    </BrowserRouter>
  </StrictMode>,
)
