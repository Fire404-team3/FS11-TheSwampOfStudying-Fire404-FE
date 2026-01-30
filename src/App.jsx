import { Route, Routes } from 'react-router';
import Home from './domains/home/pages/Home';
import styles from './App.module.css';
import CreateStudy from './domains/createStudy/pages/CreateStudy';
import ModalTestPage from './components/PasswordModal/ModalTestPage';
import HabitPage from './domains/habit/page/HabitPage';

// 모달 테스트용, '스터디 상세 페이지' 연결 후 삭제
import { FocusPage } from '@/domains/focus/pages';

function App() {
  return (
    <>
      {/* 추후 컴포넌트들이 들어올 예정입니다. */}
      <h1 className={styles.srOnly}>공부의 숲</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-study" element={<CreateStudy />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/focus" element={<FocusPage />} />

        {/* 상세페이지 테스트용 */}
        <Route path="/test" element={<ModalTestPage />} />
      </Routes>
    </>
  );
}

export default App;
