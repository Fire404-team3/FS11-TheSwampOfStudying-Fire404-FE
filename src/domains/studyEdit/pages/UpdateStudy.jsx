import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getStudyDetail, updateStudy } from '@/api/studyCreateEditApi.js';

import useStudyForm from '@/hooks/useStudyForm';
import StudyForm from '@/components/StudyForm/StudyForm';
import PasswordModal from '../../../components/PasswordModal/PasswordModal';

import '@/styles/reset.css';
import '@/styles/index.css';
import styles from '../../createStudy/pages/CreateStudy.module.css';

/**
 * [스터디 수정]
 * useStudyFrom 훅과 StudyForm 컴포넌트와 조립
 * 스터디 수정 기능만 연결
 */
const UpdateStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. 상태 관리 (hook 추가)
  const [isCheckDone, setIsCheckDone] = useState(false); // 모달먼저 보여주기
  const [initialData, setInitialData] = useState(null);
  const { formData, errors, setErrors, handleInputChange } =
    useStudyForm(initialData);

  // 2. 비밀번호 확인 성공 핸들러
  const handleCheckSuccess = async (password) => {
    try {
      const data = await getStudyDetail(id);

      // 불러온 데이터 + 인증된 비밀번호를 폼 초기값으로 설정
      setInitialData({
        nickname: data.nickname || '',
        name: data.name || '',
        description: data.description || '',
        background: data.background || 'colorGreen',
        password: password, // 수정 권한용 비밀번호 유지
        passwordConfirm: password,
      });

      setIsCheckDone(true);
    } catch (error) {
      toast.error(error.message || '스터디 정보를 불러오는데 실패했습니다.');

      // 로딩 실패시 뒤로가기
      navigate(-1);
    }
  };

  // 3. 수정 제출 핸들러 (API 호출)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateStudy(id, formData);
      toast.success('성공적으로 수정되었습니다!');

      // 성공 시 상세페이지로 이동
      navigate(`/studies/${id}`);
    } catch (error) {
      toast.error(
        error.message || '수정에 실패했습니다. 입력값을 확인해주세요.',
      );

      if (error.details) {
        setErrors(error.details);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* 인증 전 - 비밀번호 모달 노출 */}
      {!isCheckDone ? (
        <PasswordModal
          studyId={id}
          studyName="스터디 정보 수정"
          mode="edit"
          onCheck={handleCheckSuccess}
          onClose={() => navigate(-1)}
        />
      ) : (
        // 인증 후 : 기존 스터디 생성과 동일한 UI 노출
        <main className={styles.main}>
          <h1 className={styles.title}>스터디 수정하기</h1>
          {/* 데이터가 로드된 후 폼 렌더링 */}
          {initialData && (
            <StudyForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              submitLabel="수정 완료"
              isCreateMode={false} // 비밀번호 창 숨김 (모달에서 입력완료)
            />
          )}
        </main>
      )}
    </div>
  );
};

export default UpdateStudy;
