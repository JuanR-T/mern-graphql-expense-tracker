import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { GridBackgroundDemo } from './components/ui/grid-background.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackgroundDemo >
        <App />
      </GridBackgroundDemo>
    </BrowserRouter>
  </StrictMode>,
)
