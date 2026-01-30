import { Link } from 'react-router';
import styles from './FocusBoard.module.css';
import icPoint from '@/assets/ic_point.svg';
import icArrowRight from '@/assets/ic_arrow_right.svg';

/**
 * @param {Object} props
 * @param {string} props.studyName - 스터디 이름
 * @param {number} props.points - 획득 포인트
 * @param {React.ReactNode} props.children - 타이머 카드 등 내부 콘텐츠
 */
export function FocusBoard({ studyName, points, children }) {
  return (
    <section className={styles.board}>
      <div className={styles.header}>
        <div className={styles.leftSection}>
          <h2 className={styles.studyName}>{studyName}</h2>
          <p className={styles.pointsLabel}>현재까지 획득한 포인트</p>
          <div className={styles.pointsBadge}>
            <img src={icPoint} alt="포인트" style={{ width: '1.1875rem', height: '1.1875rem' }} />
            <span>{points}P 획득</span>
          </div>
        </div>
        <nav className={styles.rightSection}>
          <Link to="/habit" className={styles.navButton}>
            오늘의 습관
            <img src={icArrowRight} alt="" style={{ width: '1.5rem', height: '1.5rem' }} />
          </Link>
          <Link to="/" className={styles.navButton}>
            홈
            <img src={icArrowRight} alt="" style={{ width: '1.5rem', height: '1.5rem' }} />
          </Link>
        </nav>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}
