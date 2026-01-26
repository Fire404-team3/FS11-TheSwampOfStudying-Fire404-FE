import StudyCard from '../../StudyCard';
import styles from '../StudyExploreList.module.css';

export default function StudyGrid({ studies, searchTerm }) {
  const renderEmptyMessage = () => {
    if (searchTerm) {
      return <p>{searchTerm}에 대한 검색 결과가 없습니다.</p>;
    }
    return <p>아직 둘러 볼 스터디가 없습니다.</p>;
  };
  return (
    <>
      {studies.length === 0 ? (
        renderEmptyMessage()
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
