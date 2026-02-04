import HabitRecordRow from '../HabitRecordRow/HabitRecordRow';
import styles from './HabitRecord.module.css';

function HabitRecord({ habits }) {
  return (
    <article data-length={habits.length} className={styles.container}>
      <h2 className={styles.title}>습관 기록표</h2>

      {habits.length > 0 ? (
        <div className={styles.grid}>
          <div className={styles.headerRow}>
            <div />
            <div className={styles.headerDays}>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
              <div>일</div>
            </div>
          </div>

          {habits.map((habit, index) => (
            <HabitRecordRow key={habit.id} habit={habit} index={index + 1} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            아직 습관이 없어요.
            <br />
            오늘의 습관에서 습관을 생성해 보세요
          </p>
        </div>
      )}
    </article>
  );
}

export default HabitRecord;
