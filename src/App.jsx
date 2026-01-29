import styles from './App.module.css';
import HabitPage from './domains/habit/HabitPage';

function App() {
  return (
    <>
      {/* 추후 컴포넌트들이 들어올 예정입니다. */}
      <h1 className={styles.srOnly}>공부의 숲</h1>
      <HabitPage />
    </>
  );
}

export default App;
