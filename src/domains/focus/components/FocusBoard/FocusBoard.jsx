import styles from './FocusBoard.module.css';
import { StudyHeader } from '../StudyHeader/StudyHeader';

/**
 * @param {Object} props
 * @param {string} props.nickname - 사용자 닉네임
 * @param {string} props.name - 스터디 이름
 * @param {number} props.points - 획득 포인트
 * @param {React.ReactNode} props.children - 타이머 카드 등 내부 콘텐츠
 */
export function FocusBoard({ nickname, name, points, children }) {
  return (
    <section className={styles.board}>
      <StudyHeader nickname={nickname} name={name} points={points} />
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}
