import { apiRequest } from './index';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

export const getStudies = async ({ search, sort, order, page, limit }) => {
  const params = new URLSearchParams({
    search: search || '',
    sort,
    order,
    page,
    limit,
  });

  const response = await fetch(`${BASE_URL}/studies?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (response.status >= 500) {
      throw new Error('서버 점검 중입니다. 잠시 후 다시 시도해 주세요.');
    }
    if (response.status >= 400) {
      throw new Error(errorData.message || '요청 값이 올바르지 않습니다.');
    }
    throw new Error(
      `데이터를 불러오는데 실패했습니다. (Status: ${response.status})`,
    );
  }
  return await response.json();
};

/**
 * [Study API 생성/비밀번호 검증 모달/수정/삭제 통합]
 */

// 서버주소, 향후 env로 관리

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

  // 1. 성공했는지 확인 / 성공하면 JSON 변환 없이 바로 리턴
  if (response.ok) {
    return 'OK';
  }

  // 2. 실패했다면, 에러메세지를 위해 JSON 가져오기
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || '비밀번호가 일치하지 않습니다.');
  }
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

/**
 * 스터디 상세 정보를 가져오는 API
 * @param {string} id - 스터디 아이디
 * @returns {Promise<{data: object}>} - 프론트엔드 일관성을 위해 { data: ... } 구조로 반환
 */
export const fetchAllResourcesList = async (id) => {
  // 서버에 데이터를 요청함
  const response = await fetch(`${BASE_URL}/studies/${id}`);

  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }

  const data = await response.json();
  return data;
};

/**
 * 포인트 적립 API
 * @param {string} studyId - 스터디 ID
 * @param {number} minutes - 공부한 시간 (분)
 * @param {boolean} isSuccess - 집중 성공 여부
 * @returns {Promise<{ studyId: string, earnedPoints: number, totalPoints: number }>}
 */
export async function addPoints(studyId, minutes, isSuccess) {
  const response = await apiRequest(`/studies/${studyId}/points`, {
    method: 'POST',
    body: { minutes, isSuccess },
  });

  return response;
}
