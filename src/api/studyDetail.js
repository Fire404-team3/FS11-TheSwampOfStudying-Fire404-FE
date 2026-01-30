const API_BASE_URL = 'http://localhost:5005';

export const fetchAllResourcesList = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/studies/${id}/habits/resources`,
    );

    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('전송 에러', error);
  }
};
