import { useEffect, useState } from 'react';

/**
 * [공통 폼 로직 hook]
 * 폼 데이터와 에러 상태 관리, 입력 핸들러 작성
 */
const useStudyForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  // 객체를 문자열로 변환 -> 객체가 새로 만들어져도 내용이 같으면 문자열이 안바뀌게
  const formKey = JSON.stringify(initialValues || {});

  // 값이 변경되면 폼에 채우기
  useEffect(() => {
    // 초기값이 없으면 바로 리턴
    setFormData(JSON.parse(formKey));
  }, [formKey]);

  // 내용 입력 시 에러 메세지 지우기
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return {
    formData,
    errors,
    setErrors,
    handleInputChange,
  };
};

export default useStudyForm;
