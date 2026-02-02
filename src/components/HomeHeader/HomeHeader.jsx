import { Link } from 'react-router';
import styles from './HomeHeader.module.css';
import logo from '/src/assets/img_logo.svg';

export function HomeHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="공부의숲 홈으로 이동" />
      </Link>

      {/* [수훈] 링크 수정 */}
      <Link to="/studies/new" className={styles.createButton}>
        스터디 만들기
      </Link>
    </header>
  );
}
