import styles from './DailyHabit.module.css';

function DailyHabit() {
  return (
    <div className={styles.dailyHabitContainer}>
      <div className={styles.habitBox}>
        <h2 className={styles.title}>
          오늘의 습관
          <button className={styles.patchHabitBtn}>목록 수정</button>
        </h2>
        {/* 여기부터 습관 버튼 들 */}
        <div className={styles.habitBtnContainer}>
          <button className={styles.habitBtn}>놀자....</button>
          <button className={styles.habitBtnClick}>놀자....</button>
          <button className={styles.habitBtn}>놀자....</button>
        </div>

        {/* 오지마시오 */}
      </div>
    </div>
  );
}

export default DailyHabit;
