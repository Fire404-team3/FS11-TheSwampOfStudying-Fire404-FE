import React from 'react';
import styles from './FormInput.module.css';

// 닉네임, 스터디 이름, 패스워드, 패스워드 확인 텍스트 입력 처리, 에러 처리

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  onInputChange,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <input
        name={name}
        type={type}
        className={error ? styles.errorInput : styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
      {/* 에러 메세지가 있을때만 렌더링 */}
      {error && <p className={styles.errorText}>*{error[0]}</p>}
    </div>
  );
};

export default FormInput;
