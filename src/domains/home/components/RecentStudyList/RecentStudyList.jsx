import { useState } from 'react';
import styles from './RecentStudyList.module.css';
import StudyCard from '../StudyCard';
export default function RecentStudyList() {
  const [recentStudies, setRecentStudies] = useState(() => {
    const saved = localStorage.getItem('recentStudies');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('데이터를 파싱하는 중 오류가 발생했습니다.', error);
        return [];
      }
    }
    return [];
  });

  if (recentStudies.length === 0) return <p>아직 조회한 스터디가 없어요</p>;

  return (
    <section className={styles.recentSection}>
      <h2 className={styles.title}>최근 조회한 스터디</h2>
      <div className={styles.recentContainer}>
        {recentStudies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
