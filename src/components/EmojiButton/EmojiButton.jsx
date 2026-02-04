import { useState, useEffect } from 'react';
import { getEmojiActive, setEmojiActive } from '@/utils/emojiStorage';
import { decreaseEmoji, increaseEmoji } from '@/api/emoji.api';
import clsx from 'clsx';
import styles from './EmojiButton.module.css';

export function EmojiButton({ studyId, emojiType, count, onRefresh }) {
  const [isActive, setIsActive] = useState(() =>
    getEmojiActive(studyId, emojiType),
  );

  useEffect(() => {
    setIsActive(getEmojiActive(studyId, emojiType));
  }, [studyId, emojiType]);

  const handleClick = async () => {
    try {
      if (isActive) {
        // 활성화일 때 이모지 클릭 -> 감소(PATCH) 호출
        await decreaseEmoji({ studyId, emojiType });
        setEmojiActive(studyId, emojiType, false);
      } else {
        // 비활성화일 때 이모지 클릭 -> 증가(POST) 호출
        await increaseEmoji({ studyId, emojiType });
        setEmojiActive(studyId, emojiType, true);
      }

      // 로컬 상태 반전
      setIsActive((prev) => !prev);

      if (onRefresh) onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={clsx(styles.emojiBadge, isActive && styles.active)}
      onClick={handleClick}
    >
      <span> {emojiType}</span>
      <span className={styles.emojiCount}> {count}</span>
    </button>
  );
}
