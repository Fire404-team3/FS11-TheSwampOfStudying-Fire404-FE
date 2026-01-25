import { useEffect, useState } from 'react';
import DailyHabit from './components/DailyHabit/DailyHabit';
import styles from './HabitPage.module.css';

function habitPage() {
  //예비 id : studyid 번호
  const id = '101';

  const [current, setCurrent] = useState(new Date());

  //날짜,시간 업로드
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent(new Date());
    }, 60000); //1분에 한번씩 업로드
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.habitContainer}>
      <div className={styles.habitBox}>
        <div className={styles.navTop}>
          {/* 여기  연우는 추후 {nickname}으로 교체 */}
          <p className={styles.studyNameTitle}>연우의 개발공장</p>
          {/* 여기는 버튼 들어옴....*/}
        </div>

        <div className={styles.timeContainer}>
          <p className={styles.nowTimeWord}>현재 시간</p>
          <div className={styles.imRealClock}>
            {`${current.toISOString().slice(0, 10)}. ${current.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' })}`}
          </div>
        </div>

        {/* 임의로 id값 부여  */}
        <DailyHabit id={id} />
        {/* 넘어오지 마시오  */}
      </div>
    </div>
  );
}

export default habitPage;
