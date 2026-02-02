import styles from './EmojiPickerWrapper.module.css';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import smileIcon from '@/assets/images/ic_smile.svg';

export function EmojiPickerWrapper({onSelect}) {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData.emoji);
    setOpen(false);
  };

  return (
    <div className={styles.emojiPickerWrapper}>
      <button onClick={() => setOpen((v) => !v)}>
        <img src={smileIcon} alt="이모지" />
        <span>추가</span>
      </button>

      {open && (
        <div className={styles.emojiPicker}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}
