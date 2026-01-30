import FormInput from '@/domains/createStudy/components/FormInput';
import FormTextArea from '@/domains/createStudy/components/FormTextArea';
import BackgroundSelector from '@/domains/createStudy/components/BackgroundSelector';
import SubmitButton from '@/domains/createStudy/components/SubmitButton';
import styles from '@/domains/createStudy/pages/CreateStudy.module.css';

const StudyForm = ({
  formData,
  errors,
  onChange,
  onSubmit,
  submitLabel,
  isCreateMode = false, //스터디 생성 모드일때만 비밀번호 창 보이게
}) => {
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

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {/* 공통 필드 */}
      <FormInput
        label="닉네임"
        name="nickname"
        placeholder="닉네임을 입력해 주세요"
        value={formData.nickname || ''}
        error={errors.nickname}
        onInputChange={onChange}
      />
      <FormInput
        label="스터디 이름"
        name="name"
        placeholder="스터디 이름을 입력해 주세요"
        value={formData.name || ''}
        error={errors.name}
        onInputChange={onChange}
      />
      <FormTextArea
        label="소개"
        name="description"
        placeholder="소개 멘트를 작성해 주세요"
        value={formData.description || ''}
        error={errors.description}
        onInputChange={onChange}
      />
      <BackgroundSelector
        options={STUDY_BACKGROUNDS}
        selected={formData.background}
        onSelect={onChange}
      />
      {/* 스터디 생성일때만 비밀번호 입력 필드 보이게 */}
      {isCreateMode && (
        <>
          <FormInput
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={formData.password || ''}
            error={errors.password}
            onInputChange={onChange}
          />

          <FormInput
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해 주세요"
            value={formData.passwordConfirm || ''}
            error={errors.passwordConfirm}
            onInputChange={onChange}
          />
          <SubmitButton label={submitLabel} />
        </>
      )}
    </form>
  );
};

export default StudyForm;
