import StudyCard from '../StudyCard';
import EmptyMessage from './EmptyMessage';
import styles from './StudyGrid.module.css';

export default function StudyGrid({ studies, searchTerm }) {
  return (
    <>
      {studies.length === 0 ? (
        <EmptyMessage searchTerm={searchTerm} />
      ) : (
        <div className={styles.grid}>
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      )}
    </>
  );
}
