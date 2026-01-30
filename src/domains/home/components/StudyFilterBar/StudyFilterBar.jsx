import { useState } from 'react';
import styles from './StudyFilterBar.module.css';

export default function StudyFilterBar({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { label: '최근 순', field: 'createdAt', order: 'desc' },
    { label: '오래된 순', field: 'createdAt', order: 'asc' },
    { label: '많은 포인트 순', field: 'points', order: 'desc' },
    { label: '적은 포인트 순', field: 'points', order: 'asc' },
  ];

  const currentLabel =
    sortOptions.find(
      (opt) => opt.field === sortOrder.field && opt.order === sortOrder.order,
    )?.label || '최근 순';

  return (
    <div className={styles.filterBarContainer}>
      <input
        className={styles.filterInput}
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className={styles.selectWrapper}>
        <div className={styles.filterSelect} onClick={() => setIsOpen(!isOpen)}>
          {currentLabel}
          <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </div>

        {isOpen && (
          <ul className={styles.optionsList}>
            {sortOptions.map((option) => (
              <li
                key={`${option.field}_${option.order}`}
                className={styles.optionItem}
                onClick={() => {
                  onSortChange({ field: option.field, order: option.order });
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
