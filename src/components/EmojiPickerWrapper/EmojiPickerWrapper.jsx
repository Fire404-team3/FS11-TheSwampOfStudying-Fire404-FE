import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import smileIcon from '@/assets/images/ic_smile.svg';

export function EmojiPickerWrapper() {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    console.log(emojiData.emoji);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen((v) => !v)}>
        <img src={smileIcon} alt="" />
        추가
      </button>
      {open && <EmojiPicker onEmojiClick={handleEmojiClick} />}
    </div>
  );
}
