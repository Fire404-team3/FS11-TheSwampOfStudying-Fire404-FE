import { Routes, Route } from 'react-router';
import styles from './App.module.css';
import { FocusPage } from '@/domains/focus/pages';

function App() {
  return (
    <>
      <h1 className={styles.srOnly}>공부의 숲</h1>
      <Routes>
        <Route path="/focus" element={<FocusPage />} />
      </Routes>
    </>
  );
}

export default App;
