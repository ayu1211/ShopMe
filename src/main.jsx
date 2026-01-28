import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import "./index.css";
import { CheckoutProvider } from './context/CheckoutContext.jsx';
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
  <AuthProvider> 
  <CheckoutProvider>
    <App />
  </CheckoutProvider>
    
  </AuthProvider>
  </StrictMode>,
)
