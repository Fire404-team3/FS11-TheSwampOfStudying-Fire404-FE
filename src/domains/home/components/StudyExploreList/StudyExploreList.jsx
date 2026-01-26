import StudyCard from '../StudyCard/StudyCard';
import styles from './StudyExploreList.module.css';

export default function StudyExploreList({
  studies,
  onSearchChange,
  searchTerm,
  sortOrder,
  onSortChange,
}) {
  const renderEmptyMessage = () => {
    if (searchTerm) {
      return <p>{searchTerm}에 대한 검색 결과가 없습니다.</p>;
    }
    return <p>아직 둘러 볼 스터디가 없습니다.</p>;
  };
  return (
    <>
      <section>
        <div>
          <input
            type="text"
            placeholder="검색"
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="created_desc">최근 순</option>
            <option value="created_asc">오래된 순</option>
            <option value="points_desc">많은 포인트 순</option>
            <option value="points_asc">적은 포인트 순</option>
          </select>
        </div>

        {studies.length === 0 ? (
          renderEmptyMessage()
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
