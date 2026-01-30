import { Link, Routes, Route } from 'react-router';
import styles from './HomeHeader.module.css';

export function HomeHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src="/img_logo.svg" alt="공부의숲 홈으로 이동" />
      </Link>
      <Link to="/create-study" className={styles.createButton}>
        스터디 만들기
      </Link>
    </header>
  );
}
