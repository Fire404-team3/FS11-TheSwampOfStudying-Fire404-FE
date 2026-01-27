import styles from './StudyFilterBar.module.css';

export default function StudyFilterBar({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className={styles.filterBarContainer}>
      <input
        className={styles.filterInput}
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className={styles.filterSelect}
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="created_desc">최근 순</option>
        <option value="created_asc">오래된 순</option>
        <option value="points_desc">많은 포인트 순</option>
        <option value="points_asc">적은 포인트 순</option>
      </select>
    </div>
  );
}
