import React from 'react';
import styles from './FormTextArea.module.css';

// 설명 텍스트 입력 처리, 에러 처리

const FormTextArea = ({
  label,
  name,
  placeholder,
  value,
  error,
  onInputChange,
}) => {
  return (
    <div className={styles.textareaGroup}>
      <label className={styles.label}>{label}</label>
      <textarea
        name={name}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        rows={3} // 3줄 정도 쓸 수 있는 높이
      />
      {/* 에러 메세지가 있을때만 렌더링 */}
      {error && <p className={styles.errorText}>*{error[0]}</p>}
    </div>
  );
};

export default FormTextArea;
