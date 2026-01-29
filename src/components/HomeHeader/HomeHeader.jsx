import { Link } from 'react-router';
import styles from './HomeHeader.module.css';
import logo from '/src/assets/img_logo.svg';

export function HomeHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="공부의숲 홈으로 이동" />
      </Link>
      <Link to="/create-study" className={styles.createButton}>
        스터디 만들기
      </Link>
    </header>
  );
}
