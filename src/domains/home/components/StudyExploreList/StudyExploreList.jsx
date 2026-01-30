import StudyFilterBar from '../StudyFilterBar/StudyFilterBar';
import Pagination from '@/common/components/Pagination/Pagination';
import StudyGrid from '../StudyGrid/StudyGrid';
import styles from './StudyExploreList.module.css';

export default function StudyExploreList({
  studies,
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
  currentPage,
  onPageChange,
  totalCount,
  limit,
}) {
  const handleSearch = (value) => {
    onSearchChange(value);
    onPageChange(1);
  };

  const handleSort = (value) => {
    onSortChange(value);
    onPageChange(1);
  };

  return (
    <div className={styles.exploreSection}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>스터디 둘러보기</h2>
        <div className={styles.filterArea}>
          <StudyFilterBar
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            sortOrder={sortOrder}
            onSortChange={handleSort}
          />
        </div>
        <StudyGrid studies={studies} searchTerm={searchTerm} />
      </div>
      <div className={styles.paginationArea}>
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          limit={limit}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
