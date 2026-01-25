import { useEffect, useState } from 'react';
import styles from './DailyHabit.module.css';
import { fetchHabits } from '@/apis/habit';
import clsx from 'clsx';

//habitPage에서 임의로 id값 부여...
function DailyHabit({ id }) {
  const [habitList, setHabitList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  //habit 가져오기 
  useEffect(() => {
    const list = async () => {
      try {
        setLoading(!loading);
        setError(null);
        const result = await fetchHabits(id);
        setHabitList(result.data.habits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    list();
  }, [id]);

  return (
    <div className={styles.dailyHabitContainer}>
      <div className={styles.habitBox}>
        <h2 className={styles.title}>
          오늘의 습관

          {/* 목록 수정 링크 들어와야함 */}
          <button className={styles.patchHabitBtn}>목록 수정</button>
        </h2>

        {/* 여기부터 습관 버튼 들 */}
        <div className={styles.habitBtnContainer}>
          {/* 클릭 버튼 토글은 진행중... */}
          {habitList.map((habit) => (
            <button
              key={habit.id}
              className={clsx(styles.habitBtn, {[styles.habitBtnClick] : habit.checkDate})}>
              {habit.name}
            </button>
          ))}
        </div>

        {/* 넘어 오지마시오 */}
      </div>
    </div>
  );
}

export default DailyHabit;
