import { Route, Routes } from 'react-router';
import Home from './domains/home/pages/Home';
import styles from './App.module.css';
import CreateStudy from './domains/createStudy/pages/CreateStudy';
import HabitPage from './domains/habit/page/HabitPage';
import { FocusPage } from '@/domains/focus/pages';
import StudyDetailPage from './domains/stydyDetail/pages/StudyDetailPage';
import UpdateStudy from './domains/studyEdit/pages/UpdateStudy';
import { Toaster } from 'react-hot-toast';

// 모달 테스트용, '스터디 상세 페이지' 연결 후 삭제
// import ModalTestPage from './components/PasswordModal/ModalTestPage';

function App() {
  return (
    <>
      {/* 추후 컴포넌트들이 들어올 예정입니다. */}
      <h1 className={styles.srOnly}>공부의 숲</h1>

      {/* [수훈] 토스터 작성 */}
      <Toaster
        position="bottom-center"
        containerStyle={{
          zIndex: 100000,
        }}
        toastOptions={{
          // 1. 모든 토스트 공통 스타일
          style: {
            borderRadius: '0.75rem',
            fontSize: '1rem',
            padding: '0.875rem 1.125rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.625rem',
          },
          // 2. 성공(success) 토스트 스타일
          success: {
            style: {
              background: '#E1EDDE',
              color: '#578246',
            },
          },
          // 3. 에러(error) 토스트 스타일
          error: {
            style: {
              background: '#FDE0E9',
              color: '#F50E0E',
              width: '20.9rem',
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* 결로 수정 */}
        <Route path="/studies/new" element={<CreateStudy />} />

        {/* [수훈] useParams 사용으로 상세페이지 패스 수정 */}
        <Route path="/studies/:id" element={<StudyDetailPage />} />

        {/* [수훈] 스터디 수정하기 라우터 추가 */}
        <Route path="/studies/:id/update" element={<UpdateStudy />} />

        <Route path="/habit" element={<HabitPage />} />
        <Route path="/focus" element={<FocusPage />} />
      </Routes>
    </>
  );
}

export default App;
