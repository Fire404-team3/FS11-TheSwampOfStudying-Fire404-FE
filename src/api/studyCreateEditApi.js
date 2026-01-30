/**
 * [Study API 생성/비밀번호 검증 모달/수정/삭제 통합]
 */

// 서버주소, 향후 env로 관리
const BASE_URL = 'http://localhost:5001';

// 1. 스터디 생성용 API
export const postStudy = async (studyData) => {
  const response = await fetch(`${BASE_URL}/studies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studyData),
  });

  const result = await response.json();

  // 서버 응답 상태 확인
  if (!response.ok) {
    // 에러 객체 생성
    const error = new Error(result.message || '스터디 생성에 실패했습니다.');

    // detail에 붙이기
    if (result.details) {
      error.details = result.details;
    }

    throw error;
  }
  return result;
};

// 2. 비밀번호 검증용 (모달)
export const checkStudyPassword = async (id, password) => {
  const response = await fetch(`${BASE_URL}/studies/${id}/check-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '비밀번호가 일치하지 않습니다.');
  }

  return result;
};

// 3. 특정 스터디 상세 정보 가저오기 (수정 페이지)
export const getStudyDetail = async (id) => {
  const response = await fetch(`${BASE_URL}/studies/${id}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '데이터를 가져오지 못했습니다.');
  }
  return result;
};

// 4. 스터디 수정하기 (PATCH)
export const updateStudy = async (id, updateData) => {
  const response = await fetch(`${BASE_URL}/studies/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });

  const result = await response.json();

  if (!response.ok) {
    // 에러 객체 생성
    const error = new Error(result.message || '수정에 실패했습니다.');

    // 수정 시에도 유효성 검사
    if (result.details) {
      error.details = result.details;
    }
    throw error;
  }
  return result;
};

// 5. 스터디 삭제하기 (DELETE)
export const deleteStudy = async (id, password) => {
  const response = await fetch(`${BASE_URL}/studies/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  // 204 No Content 체크
  const NO_CONTENT = 204;
  if (response.status === NO_CONTENT) {
    return;
  }

  // 204가 아니면 파싱
  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || '삭제에 실패했습니다. 비밀번호를 확인해주세요.',
    );
  }

  return result;
};
