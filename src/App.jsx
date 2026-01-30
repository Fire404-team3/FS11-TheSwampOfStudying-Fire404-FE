import { Route, Routes } from 'react-router';
import styles from './App.module.css';
import CreateStudy from './domains/createStudy/pages/CreateStudy';

// 모달 테스트용, '스터디 상세 페이지' 연결 후 삭제
import ModalTestPage from './components/PasswordModal/ModalTestPage';

function App() {
  return (
    <>
      {/* 추후 컴포넌트들이 들어올 예정입니다. */}
      <h1 className={styles.srOnly}>공부의 숲</h1>
      <Routes>
        {/* 모달 테스트용 - 향후 '스터디 상세 페이지'로 연결하기 */}
        <Route path="/test" element={<ModalTestPage />} />

        <Route path="/" element={<CreateStudy />} />
      </Routes>
    </>
  );
}

export default App;
