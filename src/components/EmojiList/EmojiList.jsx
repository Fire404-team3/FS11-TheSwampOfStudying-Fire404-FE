import { increaseEmoji } from '@/api/emojiUpdate';
import { EmojiButton } from '../EmojiButton';
import { EmojiPickerWrapper } from '../EmojiPickerWrapper';
import styles from './EmojiList.module.css';

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

  return (
    <ul className={styles.emojiListContainer}>
      {/* 기존 이모지 목록 */}
      {emojiLogs.map((log) => (
        <li key={log.id}>
          <EmojiButton
            studyId={studyId}
            emojiType={log.emojiType}
            count={log.count}
          />
        </li>
      ))}

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
