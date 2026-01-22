import DailyHabit from './components/dailyHabit/dailyHabit';
import styles from './HabitPage.module.css';

function habitPage() {
  return (
    <div className={styles.habitContainer}>
      <div className={styles.habitBox}>
        <div className={styles.navTop}>
          <p className={styles.studyNameTitle}>연우의 개발공장</p>
          {/* 여기는 버튼 들어옴....*/}
        </div>

        <div className={styles.timeContainer}>
          <p className={styles.nowTimeWord}>현재 시간</p>
          <div className={styles.imRealClock}>나는 시간이다</div>
        </div>

        <DailyHabit />
        {/* 넘어오지 마시오  */}
      </div>
    </div>
  );
}

export default habitPage;
