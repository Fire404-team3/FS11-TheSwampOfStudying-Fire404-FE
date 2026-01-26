import styles from './StudyCard.module.css';

export default function StudyCard({ study }) {
  if (!study) {
    return <div>데이터 로딩 중...</div>;
  }

  const { name, points, description, createdAt } = study;

  const startDate = new Date(createdAt);
  const today = new Date();

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return (
    <article>
      <div className={styles.backgroundArea}>
        <div className={styles.headerContent}>
          <div className={styles.titleRow}>
            <h1>{name}</h1>
            <div className={styles.pointBadge}>
              <span>🍃</span>
              <span>{points.toLocaleString()}P 획득</span>
            </div>
          </div>

          <p className={styles.statusText}>{diffDays}일째 진행 중</p>
        </div>

        <div className={styles.bodyContent}>
          <h2>{description}</h2>
        </div>
        <div className={styles.emojiContainer}>
          <div className={styles.emojiBadge}>👩‍💻 37</div>
          <div className={styles.emojiBadge}>🔥 26</div>
          <div className={styles.emojiBadge}>🤍 14</div>
        </div>
      </div>
    </article>
  );
}
