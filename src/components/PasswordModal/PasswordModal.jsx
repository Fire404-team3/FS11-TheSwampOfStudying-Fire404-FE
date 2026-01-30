import { useState } from 'react';
import FormInput from '@/domains/createStudy/components/FormInput';
import { checkStudyPassword } from '@/api/studyCreateEditApi';
import toast from 'react-hot-toast';

import '@/styles/reset.css';
import '@/styles/index.css';
import styles from './PasswordModal.module.css';

/**
 * [스터디 비밀번호 검증 모달(서버와 통신)]
 * studyId : params의 ':id'
 * studyName : 모달 상단에 표시되는 스터디 이름
 * mode : '수정하기' or '스터디 삭제하기'
 * onCheck : 비밀번호 검증 성공 시 실행할 함수
 * onClose : 모달 닫기 함수
 */
const PasswordModal = ({ studyId, studyName, mode, onCheck, onClose }) => {
  // 비밀번호 상태 관리
  const [password, setPassword] = useState('');
  // 서버 응답을 기다리는 동안 버튼 비활성화용 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // 비밀번호 작성
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 서버 전송 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 제출 중복 클릭 방지
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      // API 호출 - 서버에 비밀번호 검증 요청
      await checkStudyPassword(studyId, password);

      // 검증 성공 시 토스트 알림(zustand 라이브러리 사용 -> zustand, react-hot-toast)
      toast.success('인증에 성공했습니다.');
      onCheck();
    } catch {
      // 에러 처리 - 토스트 메세지 띄우기
      toast.error('비밀번호가 일치하지 않습니다. 다시 입력해주세요');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 헤더 영역 */}
        <div className={styles.header}>
          <h2 className={styles.studyName}>{studyName}</h2>
        </div>

        <p className={styles.message}>권한이 필요해요!</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <FormInput
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onInputChange={handlePasswordChange}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || !password} // 로딩 중 패스워드 비활성화
          >
            {isLoading
              ? '확인 중...'
              : mode === 'edit'
                ? '수정하기'
                : '스터디 삭제하기'}
          </button>
        </form>

        <button className={styles.exitButton} type="button" onClick={onClose}>
          나가기
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
