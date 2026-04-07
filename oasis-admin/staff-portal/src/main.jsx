import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PortalProvider } from './context/PortalContext.jsx'
import '../../shared-ui/styles/tokens.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortalProvider>
      <App />
    </PortalProvider>
  </React.StrictMode>,
)
