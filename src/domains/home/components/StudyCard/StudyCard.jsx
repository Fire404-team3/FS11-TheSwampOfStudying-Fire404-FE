import styles from './StudyCard.module.css';

export default function StudyCard({ study }) {
  if (!study) {
    return <div>데이터 로딩 중...</div>;
  }
  const themeClass = styles[study.background] || styles.colorGreen;

  const { nickname, name, points, description, createdAt, background } = study;

  const startDate = new Date(createdAt);
  const today = new Date();

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return (
    <article className={`${styles.backgroundArea} ${themeClass}`}>
      <div className={styles.cardContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
              <h1 className={styles.title}>
                <span className={styles.nickname}>{nickname}</span> 의 {name}
              </h1>

              <span className={styles.pointBadge}>
                🍃{points.toLocaleString()}P 획득
              </span>
            </div>
            <p className={styles.statusText}>{diffDays}일째 진행 중</p>
          </div>
          <h2 className={styles.description}>{description}</h2>
        </div>
        <div>
          <div className={styles.emojiBadge}>👩‍💻 37</div>
          <div className={styles.emojiBadge}>🔥 26</div>
          <div className={styles.emojiBadge}>🤍 14</div>
        </div>
      </div>
    </article>
  );
}
