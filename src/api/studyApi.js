const BASE_URL = 'http://localhost:5005';

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
