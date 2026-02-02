import { EmojiButton } from '../EmojiButton';
import { EmojiPickerWrapper } from '../EmojiPickerWrapper';
import styles from './EmojiList.module.css';

export function EmojiList({ study }) {
  if (!study) {
    return <div>데이터 로딩 중...</div>;
  }

  const { id: studyId, emojiLogs = [] } = study;

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
        <EmojiPickerWrapper className={styles.emojiPicker} />
      </li>
    </ul>
  );
}
