const API_BASE_URL = 'http://localhost:5005';

/**
 * 스터디 상세 정보를 가져오는 API
 * @param {string} id - 스터디 아이디
 * @returns {Promise<{data: object}>} - 프론트엔드 일관성을 위해 { data: ... } 구조로 반환
 */
export const fetchAllResourcesList = async (id) => {
  // 서버에 데이터를 요청함
  const response = await fetch(`${API_BASE_URL}/studies/${id}`);

  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }

  const data = await response.json();
  return data;
};


