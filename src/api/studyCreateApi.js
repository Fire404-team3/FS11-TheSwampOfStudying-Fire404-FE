// 서버주소, 향후 env로 관리
const BASE_URL = 'http://localhost:5001';

export const postStudy = async (studyData) => {
  const response = await fetch(`${BASE_URL}/studies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studyData),
  });

  const result = await response.json();

  // 서버 응답 상태 확인
  if (!response.ok) {
    // 서버 응답 에러를 CreateStudy.jsx로 던짐
    throw result;
  }
  return result;
};
