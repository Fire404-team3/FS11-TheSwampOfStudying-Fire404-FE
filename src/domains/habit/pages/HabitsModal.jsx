import { useState } from 'react';
import { updateHabits } from '../api/habitmodal/habits.api.js';
import HabitItem from '../components/habitmodal/HabitItem.jsx';
import styles from './HabitsModal.module.css';
import MediumCancelButton from '@/assets/btn_cancel_md.png';
import ModificationCompleteButton from '@/assets/btn_modification_complete.png';
import PlusIcon from '@/assets/icon_plus.png';
import TrashIcon from '@/assets/icon_trash.png';

export default function HabitsModal({
  studyId,
  habits: passedHabits,
  refetchTodayHabits,
  onClose,
}) {
  const initHabits = passedHabits.map((habit) => ({
    id: habit.id,
    name: habit.name,
  }));
  const [habits, setHabits] = useState(initHabits);
  const handleChangeInput = (id) => (e) => {
    const value = e.target.value;
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, name: value } : habit,
      ),
    );
  };

  const handleClickAddNewButton = () => {
    const lastHabit = habits.at(-1);
    if (lastHabit?.id.startsWith('new-') && lastHabit.name === '') return;

    setHabits((prev) => [...prev, { id: `new-${Date.now()}`, name: '' }]);
  };

  const handleClickDeleteButton = (id) => () => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // PUT 호출 로직을 API 함수로 분리
  const handleClickUpdate = async () => {
    if (habits.some((h) => !h.name || h.name.trim() === '')) {
      alert('습관 이름은 필수입니다.');
      return;
    }

    await updateHabits(studyId, habits);
    await refetchTodayHabits(); // 수정 후 재조회
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h5 className={styles.habitsModalTitle}>습관 목록</h5>

        <div className={styles.habitsList}>
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onChangeInput={handleChangeInput(habit.id)}
              onClickDelete={handleClickDeleteButton(habit.id)}
            />
          ))}

          <button
            className={styles.habitAddButton}
            onClick={handleClickAddNewButton}
          >
            <img src={PlusIcon} className={styles.habitAddIcon} alt="추가" />
          </button>
        </div>

        <div className={styles.habitsModalActions}>
          <button onClick={onClose} className={styles.habitsModalButton}>
            <img src={MediumCancelButton} alt="취소" />
          </button>
          <button
            onClick={handleClickUpdate}
            className={styles.habitsModalButton}
          >
            <img src={ModificationCompleteButton} alt="완료" />
          </button>
        </div>
      </div>
    </div>
  );
}
