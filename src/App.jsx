import styles from './App.module.css';
import { HomeHeader } from '@/components/HomeHeader';

function App() {
  return (
    <>
      <HomeHeader />
      <h1 className={styles.srOnly}>공부의 숲</h1>
    </>
  );
}

export default App;
