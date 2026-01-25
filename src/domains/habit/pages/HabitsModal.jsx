import { useState } from 'react';

import MediumCancelButton from '@/assets/img/btn_cancel_md.png';
import ModificationCompleteButton from '@/assets/img/btn_modification_complete.png';
import PlusIcon from '@/assets/img/icon_plus.png';
import TrashIcon from '@/assets/img/icon_trash.png';

import '@/domains/habit/pages/HabitsModal.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 공통 Modal Wrapper
function Modal({ children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">{children}</div>
    </div>
  );
}

// Habits Modal
function HabitsModal({ studyId, habits: passedHabits, refetchTodayHabits, onClose }) {
  const [habits, setHabits] = useState(
    passedHabits.map((h) => ({
      id: h.id,
      name: h.name,
    }))
  );

  // Input Change - 습관명 수정 시 상태 반영
  const handleChangeInput = (id) => (e) => {
    const value = e.target.value;

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, name: value } : habit
      )
    );
  };


  // "new-타임스탬프" 형식으로 프론트 임시 ID 생성
  const handleClickAddNewButton = () => {
    const lastHabit = habits.at(-1);
    if (lastHabit?.id.startsWith('new-') && lastHabit.name === '') return;

    setHabits((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, name: '' },
    ]);
  };

  // Delete Habit
  // 삭제대상 제거 후 재배열
  const handleClickDeleteButton = (id) => () => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // Submit 처리
  // 프론트 단에서 빈 문자열 1차 방어
  const handleClickUpdate = async () => {
    if (habits.some((h) => !h.name || h.name.trim() === '')) {
      alert('습관 이름은 필수입니다.');
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/habits/${studyId}`,
        // `${BASE_URL}/studies/${studyId}/habits`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(habits),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error('서버 오류:', text);
        return;
      }

      await refetchTodayHabits();
      onClose();
    } catch (err) {
      console.error('습관 업데이트 실패', err);
    }
  };

  // 화면 렌더링 영역
  return (
    <Modal>
      <h5 className="habits-modal-title">습관 목록</h5>

      <div className="habits-list">
        {habits.map((habit) => (
          <Habit
            key={habit.id}
            habit={habit}
            onChangeInput={handleChangeInput(habit.id)}
            onClickDelete={handleClickDeleteButton(habit.id)}
          />
        ))}

        <button
          className="habit-add-button"
          onClick={handleClickAddNewButton}
        >
          <img src={PlusIcon} className="habit-add-icon" alt="추가" />
        </button>
      </div>

      <div className="habits-modal-actions">
        <button onClick={onClose} className="habits-modal-button">
          <img src={MediumCancelButton} alt="취소" />
        </button>
        <button
          onClick={handleClickUpdate}
          className="habits-modal-button"
        >
          <img src={ModificationCompleteButton} alt="완료" />
        </button>
      </div>
    </Modal>
  );
}

// Habit Item 컴포넌트 처리 
function Habit({ habit, onChangeInput, onClickDelete }) {
  return (
    <div className="habit-item">
      <input
        value={habit.name}
        onChange={onChangeInput}
        type="text"
        className="habit-input"
        spellCheck={false}
        autoFocus={habit.name === ''}
      />
      <button onClick={onClickDelete} className="habit-delete-button">
        <img
          src={TrashIcon}
          className="habit-delete-icon"
          alt="삭제"
        />
      </button>
    </div>
  );
}

export default HabitsModal;