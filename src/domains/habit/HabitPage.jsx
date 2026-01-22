import styles from './HabitPage.module.css';
import NavButton from './components/NavButton/NavButton';

function habitPage() {
  return (
    <div className={styles.habitContainer}>
      <p className={styles.studyNameTitle}>연우의 개발공장</p>
      <NavButton />

      <div>
        <p>현재 시간</p>
        <div>나는 시간이다</div>
      </div>
    </div>
  );
}

export default habitPage;
