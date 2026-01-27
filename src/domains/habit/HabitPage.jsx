import { useEffect, useState } from 'react';
import DailyHabit from './components/DailyHabit/DailyHabit';
import styles from './HabitPage.module.css';
import { LinkButton } from '@/components/LinkButton';


function HabitPage({to, className}) {
  //예비 id : studyid 번호
  const id= '101'
  const INTERVAL_TIME = 10000;
  const [current, setCurrent] = useState(new Date());

  //날짜,시간 업로드
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent(new Date());
    }, INTERVAL_TIME); //1분에 한번씩 업로드
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.habitContainer}>
      <div className={styles.habitBox}>
        <div className={styles.navTop}>
          {/* 여기{study.name}으로 교체 */}
          <p className={styles.studyNameTitle}>대나무의 늪</p>
          <div className={styles.moveBtnContainer}>
          {/* 페이지 이동 연결 해야함  */}
          <LinkButton to={to} className={className}>오늘의 집중</LinkButton> 
          <LinkButton to={to} className={className}>홈</LinkButton> 

          </div>
        </div>

        <div className={styles.timeContainer}>
          <p className={styles.nowTimeWord}>현재 시간</p>
          <div className={styles.imRealClock}>
            {`${current.toISOString('ko-Kr').slice(0, 10)} ${current.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' })}`}
          </div>
        </div>

        {/* 임의로 id값 부여  */}
        <DailyHabit id={id} />
        {/* 넘어오지 마시오  */}
      </div>
    </div>
  );
}

export default HabitPage;
