import styles from './Pagination.module.css';

export default function Pagination({
  currentPage,
  totalCount,
  limit,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / limit);
  if (currentPage >= totalPages) return null;

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.moreBtn}
        onClick={() => onPageChange(currentPage + 1)}
      >
        더보기
      </button>
    </div>
  );
}
