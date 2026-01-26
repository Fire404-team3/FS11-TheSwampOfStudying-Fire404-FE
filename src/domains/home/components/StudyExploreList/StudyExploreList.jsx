import StudyCard from '../StudyCard/StudyCard';
import styles from './StudyExploreList.module.css';

export default function StudyExploreList({ studies, onSearchChange }) {
  return (
    <>
      <section>
        <div>
          <input
            type="text"
            placeholder="검색"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {studies.length === 0 ? (
          <p>아직 둘러 볼 스터디가 없어요</p>
        ) : (
          <div className={styles.grid}>
            {studies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
