import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { postStudy } from '@/api/studyCreateEditApi';
import useStudyForm from '@/hooks/useStudyForm';
import StudyForm from '@/components/StudyForm/StudyForm';

import '@/styles/reset.css';
import '@/styles/index.css';
import styles from './CreateStudy.module.css';

// 초기값 (빈 값) -> 무한 루프 방지를 위해 컴포넌트 밖으로 변수 이동
const INITIAL_VALUES = {
  password: '',
  passwordConfirm: '',
  nickname: '',
  name: '',
  description: '',
  background: 'colorGreen',
};

// useStudyFrom 훅과 StudyForm 컴포넌트와 조립
// 스터디 생성 기능만 연결
const CreateStudy = () => {
  // 네비게이션 준비
  const navigate = useNavigate();

  // 1. useStudyFrom 훅 사용 (로직 위임)
  const { formData, errors, setErrors, handleInputChange } =
    useStudyForm(INITIAL_VALUES);

  // 2. 제출 핸들러 (API 호출)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // [프론트엔드] 비밀번호 일치여부 확인(서버 부하방지) / 나머지는 백엔드에서 유효성검사
    if (formData.password !== formData.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: ['비밀번호가 일치하지 않습니다.'],
      }));
      return;
    }

    // 데이터 필터 / 비밀번호 확인을 제외한 5가지만 추출
    // passwordConfirm: _passwordConfirm => 에러 방지
    const { passwordConfirm: _passwordConfirm, ...studyFilter } = formData;

    try {
      // API 호출 및 결과 대기
      const result = await postStudy(studyFilter);
      toast.success('성공적으로 스터디가 만들어졌습니다.');

      // 성공 시 스터디 상세페이지로 이동
      navigate(`/studies/${result.id}`);
    } catch (error) {
      const validationErrors = error.details || error.response?.data?.details;

      if (validationErrors) {
        setErrors(validationErrors);
        toast.error('입력한 정보를 다시 확인해 주세요.');
      } else {
        // 유효성 검사 에러가 아닐 때 (500 서버 에러 등)
        console.error('전송 에러:', error);
        toast.error(error.message || '시스템 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>스터디 만들기</h1>
        <StudyForm
          formData={formData}
          errors={errors}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          submitLabel="만들기"
          isCreateMode={true}
        />
      </main>
    </div>
  );
};

export default CreateStudy;
