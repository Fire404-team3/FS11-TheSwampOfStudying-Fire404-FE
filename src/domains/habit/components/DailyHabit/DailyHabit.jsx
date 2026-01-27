import { useEffect, useState } from 'react';
import styles from './DailyHabit.module.css';
import { creatHabitCheckDate, deleteHabitCheckDate, fetchHabitList } from '@/apis/habit';
import clsx from 'clsx';

//habitPage에서 임의로 id값 부여...
function DailyHabit({ id }) {
  const [habitList, setHabitList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    //토글 state
  const [clickedHabitId, setClickedHabitId] = useState([]);


  //habit 가져오기 
  useEffect(() => {
    const dailyHabitlist = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchHabitList(id);
        setHabitList(result.data.habits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    dailyHabitlist();
  }, [id]);


  //토글 click 함수 
  const handleClick = async(habitId) => {
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
        prev.includes(habitId)? prev.filter((id)=>id !== habitId): [...prev, habitId])


    } catch (error) {
      console.error('error:',error.message)
    }
  };

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
          {/* 클릭 버튼 토글 */}
          {habitList.map((habit) => (
            <button
              key={habit.id}
              className={clsx(styles.habitBtn, { [styles.habitBtnClick]: clickedHabitId.includes(habit.id) })}
              onClick={()=>handleClick(habit.id)}
            >
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
