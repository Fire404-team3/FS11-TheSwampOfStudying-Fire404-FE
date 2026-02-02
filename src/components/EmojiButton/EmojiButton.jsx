import { useState } from 'react';
import { getEmojiActive, setEmojiActive } from '@/utils/emojiStorage';
import { decreaseEmoji, increaseEmoji } from '@/api/emojiUpdate';
import clsx from 'clsx';
import styles from './EmojiButton.module.css';

export function EmojiButton({ studyId, emojiType, count }) {
  const [isActive, setIsActive] = useState(() =>
    getEmojiActive(studyId, emojiType),
  );

  const handleClick = async () => {
    try {
      if (isActive) {
        // 활성화일 때 이모지 클릭 -> 감소
        await decreaseEmoji({ studyId, emojiType });
        setEmojiActive(studyId, emojiType, false);
      } else {
        // 비활성화일 때 이모지 클릭 -> 증가
        await increaseEmoji({ studyId, emojiType });
        setEmojiActive(studyId, emojiType, true);
      }

      setIsActive((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={clsx(styles.emojiBadge, isActive && styles.active)}
    onClick={handleClick}>
      <span> {emojiType}</span>
      <span className={styles.emojiCount}> {count}</span>
    </button>
  );
}
