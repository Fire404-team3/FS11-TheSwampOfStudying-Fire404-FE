import storage from '@/utils/storage';
import styles from './StudyCard.module.css';
import clsx from 'clsx';

export default function StudyCard({ study }) {
  if (!study) {
    return <div>데이터 로딩 중...</div>;
  }

  const {
    id,
    nickname,
    name,
    points,
    description,
    createdAt,
    background,
    emojiLogs,
  } = study;

  const handleCardClick = () => {
    const recentList = storage.get('recentStudies', []);

    const filteredList = recentList.filter((item) => item.id !== id);

    const updateList = [study, ...filteredList].slice(0, 3);

    storage.set('recentStudies', updateList);

    console.log('스터디 클릭');
  };

  const themeClass = styles[background] || styles.colorGreen;
  const startDate = new Date(createdAt);
  const today = new Date();

  const diffTime = today - startDate;
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor(diffTime / MS_PER_DAY) + 1;

  const isShowEmojis = emojiLogs && emojiLogs.length > 0;

  return (
    <article
      className={clsx(styles.backgroundArea, themeClass)}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
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
        <div className={styles.emojiListContainer}>
          {isShowEmojis &&
            emojiLogs?.map((log) => (
              <div key={log.id} className={styles.emojiBadge}>
                <span className={styles.emojiType}> {log.emojiType}</span>
                <span className={styles.emojiCount}> {log.count}</span>
              </div>
            ))}
        </div>
      </div>
    </article>
  );
}
