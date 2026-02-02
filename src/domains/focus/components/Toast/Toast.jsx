import styles from './Toast.module.css';

/**
 * @param {Object} props
 * @param {'success' | 'warning'} props.variant - 토스트 타입
 * @param {string} props.message - 표시할 메시지
 * @param {boolean} props.visible - 표시 여부
 */
export function Toast({ variant = 'success', message, visible = true }) {
  if (!visible) return null;

  const icon = variant === 'success' ? '🎉' : '⏸';

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.message}>{message}</span>
    </div>
  );
}
