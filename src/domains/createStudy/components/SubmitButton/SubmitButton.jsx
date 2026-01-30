// 하단의 만들기 버튼
import { React } from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ label }) => {
  return (
    <button type="submit" className={styles.button}>
      {label}
    </button>
  );
};

export default SubmitButton;
