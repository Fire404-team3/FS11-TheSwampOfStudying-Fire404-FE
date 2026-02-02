import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from './StudyHeader.module.css';
import icPoint from '@/assets/ic_point.svg';
import icArrowRight from '@/assets/ic_arrow_right.svg';

/**
 * @param {Object} props
 * @param {string} props.nickname - 사용자 닉네임
 * @param {string} props.name - 스터디 이름
 * @param {number} props.points
 */
export function StudyHeader({ nickname, name, points }) {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);

  // 텍스트가 넘치면 marquee 애니메이션 실행
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && containerRef.current) {
        const textWidth = textRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const isTextOverflow = textWidth > containerWidth;
        setIsOverflow(isTextOverflow);
        if (isTextOverflow) {
          setScrollDistance(textWidth - containerWidth);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [nickname, name]);

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <h2 ref={containerRef} className={`${styles.studyName} ${isOverflow ? styles.overflow : ''}`}>
          <span ref={textRef} style={{ '--scroll-distance': `-${scrollDistance}px` }}>{nickname}의 {name}</span>
        </h2>
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
  );
}
