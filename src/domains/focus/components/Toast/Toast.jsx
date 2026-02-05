import { useEffect } from 'react';
import { create } from 'zustand';
import styles from './Toast.module.css';

// Zustand store
const useToastStore = create((set) => ({
  toast: null,
  showToast: (variant, message) => {
    set({ toast: { variant, message, id: Date.now() } });
  },
  hideToast: () => {
    set({ toast: null });
  },
}));

// Toast 유틸리티
export const toast = {
  success: (message) => useToastStore.getState().showToast('success', message),
  warning: (message) => useToastStore.getState().showToast('warning', message),
};

/**
 * zustand store와 연동
 * @param {Object} props
 * @param {number} [props.duration=3000] - 3초(3000ms)후 자동으로 사라짐
 */
export function Toast({ duration = 3000 }) {
  const { toast: toastData, hideToast } = useToastStore();

  useEffect(() => {
    if (toastData) {
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [toastData, duration, hideToast]);

  if (!toastData) return null;

  return (
    <div
      key={toastData.id}
      className={`${styles.toast} ${styles[toastData.variant]}`}
    >
      <span className={styles.message}>{toastData.message}</span>
    </div>
  );
}
