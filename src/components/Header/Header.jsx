import { Link } from 'react-router';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src="/img_logo.svg" alt="공부의숲 홈으로 이동" />
      </Link>
    </header>
  );
}
