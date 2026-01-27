const BASE_URL = 'http://localhost:5050';

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
    throw new Error('데이터를 불러오는데 실패했습니다');
  }

  return await response.json();
};
