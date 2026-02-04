import { useState } from 'react';
import { updateHabits } from '@/api/habits.api.js';
import HabitItem from '../HabitItem/HabitItem.jsx';
import styles from './HabitsModal.module.css';
import PlusIcon from '@/assets/images/icon_plus.png';
import TrashIcon from '@/assets/images/icon_trash.png';

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
    // 변경: id가 숫자가 아니면(임시 ID면) 신규 항목으로 간주하여 중복 추가 방지
    if (
      lastHabit &&
      typeof lastHabit?.id !== 'number' &&
      lastHabit.name.trim() === ''
    ) {
      return;
    }
    // 변경: 신규 추가시 동시 수정을 막기 위해 임시 ID 부여 (FE에서만 처리)
    setHabits((prev) => [...prev, { id: `temp-${Date.now()}`, name: '' }]);
  };

  const handleClickDeleteButton = (id) => () => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // Habit 등록/수정/삭제 처리를 위한 API 호출로직
  const handleClickUpdate = async () => {
    // 1. 프론트엔드 자체 기본 검사 (네트워크 요청 전)
    if (habits.some((habit) => !habit.name || habit.name.trim() === '')) {
      alert('습관 이름은 필수입니다.');
      return;
    }

    try {
      // 변경: 서버 전송 직전, 임시 ID를 null로 정제하여 "new-" 의존성 제거
      const habitsToSubmit = habits.map((habit) => ({
        ...habit,
        id:
          typeof habit.id === 'string' && habit.id.startsWith('temp-')
            ? null
            : habit.id,
      }));

      // 서버에 업데이트 요청 (이 안에서 에러가 나면 catch 블록으로 이동)
      await updateHabits(studyId, habitsToSubmit);
      await refetchTodayHabits(); // 수정 후 재조회
      // alert('성공적으로 수정되었습니다.');  성공 알림 필요 여부
      onClose();
    } catch (error) {
      // 서버(Zod 미들웨어 등)에서 던진 에러 메시지를 여기서 alert로 띄웁니다.
      // error.message는 habits.api.js에서 throw new Error(...)한 내용입니다.
      alert(error.message);
    }
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
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={handleClickUpdate} className={styles.saveButton}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
