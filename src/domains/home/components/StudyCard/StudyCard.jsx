import storage from '@/utils/storage';
import styles from './StudyCard.module.css';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import pointImg from '@/assets/images/ic_point.svg';

export default function StudyCard({ study, className }) {
  const [isOverflow, setIsOverflow] = useState(false);
  const titleRef = useRef(null);
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

  useEffect(() => {
    const checkOverflow = () => {
      const element = titleRef.current;

      const wrapper = element?.parentElement;

      if (element && wrapper) {
        const hasOverflow = element.scrollWidth > wrapper.clientWidth;
        console.log('오버플로우 여부:', hasOverflow);
        setIsOverflow(hasOverflow);
      }
    };

    const timer = setTimeout(checkOverflow, 100);
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [name, nickname]);

  if (!study) {
    return <div>데이터 로딩 중...</div>;
  }

  const handleCardClick = () => {
    const recentList = storage.get('recentStudies', []);

    const filteredList = recentList.filter((item) => item.id !== id);

    const updateList = [study, ...filteredList].slice(0, 3);

    storage.set('recentStudies', updateList);
    storage.set('currentStudy', study);

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
    <Link to={`/studies/${study.id}`} className={styles.linkWrapper}>
      <article
        className={clsx(styles.backgroundArea, themeClass, className)}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.cardContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.mainContainer}>
              <div className={styles.headerContainer}>
                <div className={styles.titleWrapper}>
                  <h2
                    ref={titleRef}
                    className={clsx(styles.title, isOverflow && 'is-scrolling')}
                  >
                    <span className={styles.nickname}>{nickname}</span> 의{name}
                    {isOverflow && (
                      <>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={styles.nickname}>
                          {nickname}
                        </span> 의 {name}
                      </>
                    )}
                  </h2>
                </div>

                <span className={styles.pointBadge}>
                  <img src={pointImg} />
                  {points.toLocaleString()}P 획득
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
    </Link>
  );
}
