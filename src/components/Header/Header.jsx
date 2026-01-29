import { Link } from 'react-router';
import styles from './Header.module.css';
import logo from '/src/assets/img_logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="공부의숲 홈으로 이동" />
      </Link>
    </header>
  );
}
