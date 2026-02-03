import { Route, Routes } from 'react-router';
import Home from './domains/home/pages/Home';
import styles from './App.module.css';
import CreateStudy from './domains/createStudy/pages/CreateStudy';
import HabitPage from './domains/habit/page/HabitPage';
import { FocusPage } from '@/domains/focus/pages';
import StudyDetailPage from './domains/stydyDetail/pages/StudyDetailPage';
import UpdateStudy from './domains/studyEdit/pages/UpdateStudy';
import { Toaster } from 'react-hot-toast';
import GlobalToaster from './components/Toaster/GlobalToaster';

function App() {
  return (
    <>
      {/* 추후 컴포넌트들이 들어올 예정입니다. */}
      <h1 className={styles.srOnly}>공부의 숲</h1>

      {/* [수훈] 토스터 추가 */}
      <GlobalToaster />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* [수훈] 경로 수정 */}
        <Route path="/studies/new" element={<CreateStudy />} />
        {/* [수훈] useParams 사용으로 상세페이지 패스 수정 */}
        <Route path="/studies/:id" element={<StudyDetailPage />} />
        {/* [수훈] 스터디 수정하기 라우터 추가 */}
        <Route path="/studies/:id/update" element={<UpdateStudy />} />
        <Route path="/studies/:id/habits" element={<HabitPage />} />
        <Route path="/studies/:id/focus" element={<FocusPage />} />
      </Routes>
    </>
  );
}

export default App;
