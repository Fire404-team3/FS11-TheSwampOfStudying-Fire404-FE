import { useState } from 'react';
import styles from './DailyHabit.module.css';
import {
  creatHabitCheckDate,
  deleteHabitCheckDate,
} from '@/api/dailyHabit.api';
import clsx from 'clsx';
import HabitsModal from '../../pages/HabitsModal';

//부모인 habitPage에서 props로 habitList내려 받음 .
function DailyHabit({ habitList, fetchTestData }) {
  const [clickedHabitId, setClickedHabitId] = useState([]);
   const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //토글 click 함수
  const handleClick = async (habitId) => {
    try {
      //현재 날짜 기준
      const checkDate = new Date().toISOString();
      const isChecked = clickedHabitId.includes(habitId);

      if (isChecked) {
        await deleteHabitCheckDate(habitId, checkDate);
        console.log('삭제 성공');
      } else {
        await creatHabitCheckDate(habitId, checkDate);
        console.log('생성 성공');
      }
      setClickedHabitId((prev) =>
        prev.includes(habitId)
          ? prev.filter((id) => id !== habitId)
          : [...prev, habitId],
      );
    } catch (error) {
      console.error('error:', error.message);
    }
  };

  return (
    <div className={styles.dailyHabitContainer}>
      <div className={styles.habitBox}>
        <h2 className={styles.title}>
          오늘의 습관
          {/* 목록 수정 링크 들어와야함 */}
          
          <button className={styles.patchHabitBtn}>목록 수정</button>

          {showModal && <HabitsModal
          studyId={study.id}
          habits={habits}
          refetchTodayHabits={fetchTestData}
          onClose={() => setShowModal(false)} /> }
        </h2>

        {/* 여기부터 습관 버튼 들 */}
      <div className={styles.habitBtnContainer}>
        {(!habitList || habitList.length === 0) ? (
          <div className={styles.placeholder}>아직 습관이 없어요<br/>목록 수정을 눌러 습관을 생성해보세요</div>
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

        {/* 넘어 오지마시오 */}
      </div>
    </div>
  );
}

export default DailyHabit;
