import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Router from './routes/Router'

// react router dom
import { BrowserRouter} from 'react-router-dom';

// react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
