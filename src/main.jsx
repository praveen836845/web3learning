import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navigation from '../src/Routes/Navigation';
import '../src/Style/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navigation />
  </StrictMode>,
)
