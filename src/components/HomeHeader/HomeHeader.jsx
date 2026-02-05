import { Link } from 'react-router';
// import styles from './HomeHeader.module.css';
import styles from './HomeHeader.module.css';
import logo from '@/assets/images/img_logo.svg';

export function HomeHeader() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContents}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="공부의숲 홈으로 이동" />
        </Link>

        <Link to="/studies/new" className={styles.createButton}>
          스터디 만들기
        </Link>
      </div>
    </header>
  );
}
