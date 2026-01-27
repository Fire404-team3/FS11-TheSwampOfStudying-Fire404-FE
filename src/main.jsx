import '@/styles/index.css';
import '@/styles/reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HabitsPage from './domains/habit/pages/HabitsModalTest.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HabitsPage />
  </StrictMode>,
);
