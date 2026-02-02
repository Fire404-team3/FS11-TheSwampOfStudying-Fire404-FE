import { useState } from 'react';
import styles from './DailyHabit.module.css';
import { creatHabitCheckDate, deleteHabitCheckDate } from '@/api/habits.api.js';
import clsx from 'clsx';
import HabitsModal from '../HabitsModal/HabitsModal';

//부모인 habitPage에서 props로 habitList내려 받음 .
function DailyHabit({ habitList = [], studyId, refetchTodayHabits }) {
  const [showModal, setShowModal] = useState(false);

  //로컬스토리지는 새로고침해도 값이 유지되므로 즉시 반영된 체크 상태를 보존하기 위해 사용
  const [clickedHabitId, setClickedHabitId] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('checkedHabits') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  // 토글 click 함수
  const handleClick = async (habitId) => {
    try {
      const checkDate = new Date().toISOString();
      const isChecked = clickedHabitId.includes(habitId);

      // localStorage 반영
      const next = isChecked
        ? clickedHabitId.filter((id) => id !== habitId)
        : [...clickedHabitId, habitId];
      setClickedHabitId(next);
      localStorage.setItem('checkedHabits', JSON.stringify(next));

      // 서버 요청(기존 로직 유지)
      if (isChecked) {
        await deleteHabitCheckDate(habitId, checkDate);
        console.log('삭제 성공');
      } else {
        await creatHabitCheckDate(habitId, checkDate);
        console.log('생성 성공');
      }

      // 선택적으로 서버에서 최신 자료를 다시 불러오려면 주석 해제:
      // if (typeof refetchTodayHabits === 'function') await refetchTodayHabits();
    } catch (error) {
      console.error('error:', error.message);
      // 필요하면 실패 시 롤백 로직을 여기에 추가하세요.
    }
  };

  const openModal = () => setShowModal(true);

  return (
    <div className={styles.dailyHabitContainer}>
      <div className={styles.habitBox}>
        <h2 className={styles.title}>
          오늘의 습관
          <button onClick={openModal} className={styles.patchHabitBtn}>
            목록 수정
          </button>
          {showModal && (
            <HabitsModal
              studyId={studyId}
              habits={habitList}
              refetchTodayHabits={refetchTodayHabits}
              onClose={() => setShowModal(false)}
            />
          )}
        </h2>

        <div className={styles.habitBtnContainer}>
          {!habitList || habitList.length === 0 ? (
            <div className={styles.placeholder}>
              아직 습관이 없어요
              <br />
              목록 수정을 눌러 습관을 생성해보세요
            </div>
          ) : (
            habitList.map((habit) => (
              <button
                key={habit.id}
                className={clsx(styles.habitBtn, {
                  [styles.habitBtnClick]: clickedHabitId.includes(habit.id),
                })}
                onClick={() => handleClick(habit.id)}
              >
                {habit.name}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyHabit;
