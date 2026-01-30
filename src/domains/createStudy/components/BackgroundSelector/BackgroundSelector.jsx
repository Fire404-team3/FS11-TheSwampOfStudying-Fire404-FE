import React from 'react';
import styles from './BackgroundSelector.module.css';

const BackgroundSelector = ({ options, selected, onSelect }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>배경을 선택해주세요</label>
      <div className={styles.grid}>
        {options.map((option) => (
          <button
            key={option}
            type="button" // submit 방지하기 위해 타입을 버튼으로 지정
            className={styles.item}
            onClick={() =>
              onSelect({ target: { name: 'background', value: option } })
            }
          >
            {/* 배경 이미지 프리뷰 */}
            <div className={`${styles.preview} ${styles[option]}`}>
              {/* 선택된 배경만 체크 아이콘 올라가게 */}
              {selected === option && (
                <div className={styles.checkOverlay}>
                  <div className={styles.selectIcon} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;
