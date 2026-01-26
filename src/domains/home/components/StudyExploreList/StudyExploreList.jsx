import StudyFilterBar from './components/StudyFilterBar';
import Pagination from '@/common/components/Pagination';
import StudyGrid from './components/StudyGrid';

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
    <>
      <section>
        <StudyFilterBar
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          sortOrder={sortOrder}
          onSortChange={handleSort}
        />

        <StudyGrid studies={studies} searchTerm={searchTerm} />

        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          limit={limit}
          onPageChange={onPageChange}
        />
      </section>
    </>
  );
}
