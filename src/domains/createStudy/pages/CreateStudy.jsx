import { useState } from 'react';
import { useNavigate } from 'react-router';

import FormInput from '../components/FormInput';
import FormTextArea from '../components/FormTextArea';
import BackgroundSelector from '../components/BackgroundSelector';
import SubmitButton from '../components/SubmitButton';

import '@/styles/reset.css';
import '@/styles/index.css';
import styles from './CreateStudy.module.css';
import { postStudy } from '@/api/studyCreateApi';

// 배경 8개 옵션
const STUDY_BACKGROUNDS = [
  'colorGreen',
  'colorYellow',
  'colorBlue',
  'colorPink',
  'imageDesk',
  'imageWindow',
  'imageTile',
  'imagePlant',
];

// 입력값(nickname, name 등)과 백엔드 fieldErrors를 State로 관리
const CreateStudy = () => {
  // 네비게이션 준비
  const navigate = useNavigate();

  // 입력항목 상태 관리
  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
    description: '',
    background: 'colorGreen',
    password: '',
    passwordConfirm: '',
  });

  // 백엔드 유효성 검사 에러를 적어둘 공간
  const [errors, setErrors] = useState({});

  // 공통 입력 핸들러(입력 변화 감지)
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // 기존 상태 복사 후 특정 필드만 업데이트
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 수정시작 시 에러 메세지 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // 서버 전송 로직
  const handleSubmit = async (event) => {
    event.preventDefault();

    // [프론트엔드] 비밀번호 일치여부 확인(서버 부하방지) / 나머지는 백엔드에서 유효성검사
    if (formData.password !== formData.passwordConfirm) {
      setErrors({
        passwordConfirm: ['비밀번호가 일치하지 않습니다.'],
      });
      return;
    }

    // 데이터 필터 / 비밀번호 확인을 제외한 5가지만 추출
    // passwordConfirm: _passwordConfirm => 에러 방지
    const { passwordConfirm: _passwordConfirm, ...studyFilter } = formData;

    try {
      // API 호출 및 결과 대기
      const result = await postStudy(studyFilter);
      alert('성공적으로 스터디가 만들어졌습니다.');

      // 성공 시 스터디 상세페이지로 이동
      navigate(`/studies/${result.id}`);
    } catch (error) {
      if (error.details) {
        // 400번대 유효성 검사 실패 처리
        setErrors(error.details);
      } else {
        // 500번대 에러 처리
        console.error('전송 에러:', error);
        alert('잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* 컴포넌트 부품 조립 */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>스터디 만들기</h1>
          <FormInput
            label="닉네임"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            value={formData.nickname}
            error={errors.nickname}
            onInputChange={handleInputChange}
          />

          <FormInput
            label="스터디 이름"
            name="name"
            placeholder="스터디 이름을 입력해주세요"
            value={formData.name}
            error={errors.name}
            onInputChange={handleInputChange}
          />

          <FormTextArea
            label="소개"
            name="description"
            placeholder="소개 멘트를 작성해주세요"
            value={formData.description}
            error={errors.description}
            onInputChange={handleInputChange}
          />

          <BackgroundSelector
            options={STUDY_BACKGROUNDS}
            selected={formData.background}
            onSelect={handleInputChange}
          />

          <FormInput
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            error={errors.password}
            onInputChange={handleInputChange}
          />

          <FormInput
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요"
            value={formData.passwordConfirm}
            error={errors.passwordConfirm}
            onInputChange={handleInputChange}
          />

          <SubmitButton label="만들기" />
        </form>
      </main>
    </div>
  );
};

export default CreateStudy;
