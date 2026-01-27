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
    { value: 'created_desc', label: '최근 순' },
    { value: 'created_asc', label: '오래된 순' },
    { value: 'points_desc', label: '많은 포인트 순' },
    { value: 'points_asc', label: '적은 포인트 순' },
  ];

  const currentLabel = sortOptions.find(
    (opt) => opt.value === sortOrder,
  )?.label;

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
                key={option.value}
                className={styles.optionItem}
                onClick={() => {
                  onSortChange(option.value);
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
