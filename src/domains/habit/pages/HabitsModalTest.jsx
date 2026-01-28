// HabitModalTest.jsx는 모달 테스트만을 위한 화면입니다.
// 특정 StudyId에 따른 Habits 데이타를 조회해서 모달에게 전달
import { useState, useEffect, useCallback } from 'react';
import HabitsModal from './HabitsModal.jsx';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TEST_STUDY_ID = 'ckx1abcde00001';

export default function HabitsModalTest() {
  const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 테스트 데이터 fetch
  const fetchTestData = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/habits/habitmodaltest/${TEST_STUDY_ID}`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
  
      setStudy({
        id: data.id,
        nickname: data.nickname,
        name: data.name,
        description: data.description,
        background: data.background,
      });

      setHabits(data.habits ?? []);
    } catch (err) {
      console.error('Habit fetch failed', err);
    }
  }, []);

  useEffect(() => {
    fetchTestData();
  }, [fetchTestData]);

  const openModal = () => setShowModal(true);
    
  return (
    <div>
      <h1>HabitsModal Test 페이지</h1>
      <p>스터디: {study?.name ?? '로딩중...'}</p>

      <h3>습관 목록</h3>
      {habits.length > 0 ? (
        <ul>
          {habits.map((h) => (
            <li key={h.id}>{h.name}</li>
          ))}
        </ul>
      ) : (
        <p>습관이 없습니다.</p>
      )}

      <button onClick={openModal}>습관 수정하기</button>

      {showModal && study && (
        <HabitsModal
          studyId={study.id}
          habits={habits}
          refetchTodayHabits={fetchTestData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}