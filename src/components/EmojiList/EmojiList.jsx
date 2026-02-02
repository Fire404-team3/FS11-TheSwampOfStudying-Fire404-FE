import { increaseEmoji } from '@/api/emojiUpdate';
import { EmojiButton } from '../EmojiButton';
import { EmojiPickerWrapper } from '../EmojiPickerWrapper';
import styles from './EmojiList.module.css';
import { useState } from 'react';

export function EmojiList({ study, onRefresh }) {
  const { id: studyId, emojiLogs = [] } = study;

  const handleAddEmoji = async (emojiType) => {
    try {
      await increaseEmoji({ studyId, emojiType });
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const MAX_VISIBLE = 3;

  const visibleEmojis = emojiLogs.slice(0, MAX_VISIBLE);
  const hiddenEmojis = emojiLogs.slice(MAX_VISIBLE);

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <ul className={styles.emojiListContainer}>
      {/* 항상 보이는 목록 (최대 3개) */}
      {visibleEmojis.map((log) => (
        <li key={log.id}>
          <EmojiButton
            studyId={studyId}
            emojiType={log.emojiType}
            count={log.count}
          />
        </li>
      ))}
      {/* +N 버튼 */}
      {hiddenEmojis.length > 0 && (
        <li className={styles.moreWrapper}>
          <button
            className={styles.moreButton}
            onClick={() => setIsMoreOpen((v) => !v)}
          >
            +{hiddenEmojis.length}
          </button>

          {/* 숨겨진 이모지 드롭다운 */}
          <div>
            {isMoreOpen && (
              <ul className={styles.moreDropdown}>
                {hiddenEmojis.map((log) => (
                  <li key={log.id}>
                    <EmojiButton
                      studyId={studyId}
                      emojiType={log.emojiType}
                      count={log.count}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      )}

      {/* 이모지 추가 버튼 / 피커 */}
      <li>
        <EmojiPickerWrapper
          onSelect={handleAddEmoji}
          className={styles.emojiPicker}
        />
      </li>
    </ul>
  );
}
