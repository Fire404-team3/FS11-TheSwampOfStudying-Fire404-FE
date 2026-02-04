import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { getStudyDetail, updateStudy } from '@/api/studies.api';

import useStudyForm from '@/hooks/useStudyForm';
import StudyForm from '@/components/StudyForm/StudyForm';
import PasswordModal from '@/components/PasswordModal/PasswordModal';

import '@/styles/reset.css';
import '@/styles/index.css';
import styles from '../../createStudy/pages/CreateStudy.module.css';

import { HomeHeader } from '@/components/HomeHeader';

/**
 * [스터디 수정 도우미]
 * 데이터가 로딩된 후에만 실행 -> useStudyForm 훅에 데이터 넣어주는 역할
 * 별도로 다른 곳에 재사용이 없기에 여기에 합쳐서 작성
 */
const StudyEditForm = ({ id, initialData }) => {
  const navigate = useNavigate();

  // 훅 실행 (이니셜 데이터 채우기)
  const { formData, errors, setErrors, handleInputChange } =
    useStudyForm(initialData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 서버에는 비밀번호 확인 필드가 없기에 제외
    // 에러 방지로 _passwordConfirm 작성
    const { passwordConfirm: _passwordConfirm, ...updateData } = formData;

    try {
      await updateStudy(id, updateData);
      alert('성공적으로 수정되었습니다!');
      navigate(`/studies/${id}`);
    } catch (error) {
      alert(error.message || '수정에 실패했습니다.');

      if (error.details) {
        setErrors(error.details);
      }
    }
  };

  return (
    <StudyForm
      formData={formData}
      errors={errors}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      submitLabel="수정 완료"
      isCreateMode={false}
    />
  );
};

/**
 * [스터디 수정]
 * useStudyFrom 훅과 StudyForm 컴포넌트와 조립
 * 스터디 수정 기능만 연결
 */
const UpdateStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 상태 관리 (hook 추가)
  // 비밀번호를 입력하고 왔으면 true(통과), 아니면 false(모달띄우기)
  const hasPassword = location.state?.password;
  const [isCheckDone, setIsCheckDone] = useState(!!hasPassword);
  const [initialData, setInitialData] = useState(null);

  // 2. 기존 정보 불러오기를 통해 이미 비밀번호가 있을 경우
  useEffect(() => {
    if (!hasPassword) {
      return;
    } // 비밀번호 없으면 아무것도 안 함 (모달이 처리함)

    const fetchForAutoLogin = async () => {
      try {
        const response = await getStudyDetail(id);

        // 원본 데이터 체크
        console.log('서버에서 온 원본 데이터:', response);

        // 데이터가 .data 안에 들어있으면 꺼내고, 아니면 그냥 씁니다.
        const data = response.data || response;

        // 이미 통과 상태(true)로 시작했으므로, 데이터만 채워줍니다.
        setInitialData({
          nickname: data.nickname || '',
          name: data.name || '',
          description: data.description || '',
          background: data.background || 'colorGreen',
          password: hasPassword,
          passwordConfirm: hasPassword,
        });
      } catch (error) {
        alert(error.message || '데이터를 불러오지 못했습니다.');
        navigate(-1);
      }
    };

    fetchForAutoLogin();
  }, [id, hasPassword, navigate]);

  // 3. 모달에서 비밀번호 입력한 경우
  const handleModalCheckSuccess = async (password) => {
    try {
      const response = await getStudyDetail(id);

      const data = response.data || response;

      setInitialData({
        nickname: data.nickname || '',
        name: data.name || '',
        description: data.description || '',
        background: data.background || 'colorGreen',
        password: password,
        passwordConfirm: password,
      });

      // 이 사람은 아직 통과 못 한 상태(false)였으니 문을 열어줍니다.
      setIsCheckDone(true);
    } catch (error) {
      alert(error.message || '정보 로딩 실패');
      navigate(-1);
    }
  };

  return (
    <>
      {/* 인증 전 - 비밀번호 모달 노출 */}
      {!isCheckDone ? (
        <PasswordModal
          studyId={id}
          studyName="스터디 정보 수정"
          mode="edit"
          onCheck={handleModalCheckSuccess}
          onClose={() => navigate(-1)}
        />
      ) : (
        // 인증 후 : 기존 스터디 생성과 동일한 UI 노출
        <>
          <HomeHeader />
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>스터디 수정하기</h1>

              {/* 데이터가 있을때만 StudyEditForm 컴포넌트를 보여줌 */}
              {initialData && (
                <StudyEditForm id={id} initialData={initialData} />
              )}
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateStudy;
