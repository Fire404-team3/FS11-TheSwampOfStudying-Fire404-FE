import { Route, Routes } from 'react-router';
import Home from './domains/home/pages/Home';
import styles from './App.module.css';
import CreateStudy from './domains/createStudy/pages/CreateStudy';
import HabitPage from './domains/habit/page/HabitPage';
import { FocusPage } from '@/domains/focus/pages';
import StudyDetailPage from './domains/studyDetail/pages/StudyDetailPage';
import UpdateStudy from './domains/studyEdit/pages/UpdateStudy';
import { Toaster } from 'react-hot-toast';
import GlobalToaster from './components/Toaster/GlobalToaster';

function App() {
  return (
    <>
      <h1 className={styles.srOnly}>공부의 숲</h1>

      <GlobalToaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studies/new" element={<CreateStudy />} />
        <Route path="/studies/:id" element={<StudyDetailPage />} />
        <Route path="/studies/:id/update" element={<UpdateStudy />} />
        <Route path="/studies/:id/habits" element={<HabitPage />} />
        <Route path="/studies/:id/focus" element={<FocusPage />} />
      </Routes>
    </>
  );
}

export default App;
