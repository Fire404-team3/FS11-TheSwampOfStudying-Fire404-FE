import React, { useState } from 'react';
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
  // 비밀번호 눈 모양 상태
  const [isVisible, setIsVisible] = useState(false);

  // 비밀번호 칸인지 확인
  const isPasswordField = name === 'password' || name === 'passwordConfirm';

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>

      <div className={styles.inputWrapper}>
        <input
          name={name}
          // 비밀번호 필드일 때, 눈모양 버튼이 켜지면 텍스트 아니면 패스워드 / 비밀번호 필드가 아닐 때 타입
          type={isPasswordField ? (isVisible ? 'text' : 'password') : type}
          // 기본 input 에러일때 errorInput
          className={`${styles.input} ${error ? styles.errorInput : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
        />

        {/* 비밀번호 숨김 토글 버튼 */}
        {isPasswordField && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setIsVisible(!isVisible)}
          >
            <img
              src={
                isVisible ? '/btn_visibility.svg' : '/btn_visibility_off.svg'
              }
              alt="비밀번호 보기 상태"
            />
          </button>
        )}
      </div>

      {/* 에러 메세지가 있을때만 렌더링 */}
      {error && <p className={styles.errorText}>*{error[0]}</p>}
    </div>
  );
};

export default FormInput;
