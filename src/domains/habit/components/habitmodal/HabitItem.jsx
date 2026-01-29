// HabitItem.jsx- PR 리뷰 후 재사용 컴포넌트 별도 분리(Habit Item 컴포넌트)
import React from 'react';
import TrashIcon from '@/assets/icon_trash.png';
import styles from './Habititem.module.css';

function HabitItem({ habit, onChangeInput, onClickDelete }) {
  return (
    <div className={styles.habitItem}>
      <input
        value={habit.name}
        onChange={onChangeInput}
        type="text"
        className={styles.habitInput}
        spellCheck={false}
        autoFocus={habit.name === ''}
      />
      <button onClick={onClickDelete} className={styles.habitDeleteButton}>
        <img src={TrashIcon} className={styles.habitDeleteIcon} alt="삭제" />
      </button>
    </div>
  );
}

export default HabitItem;