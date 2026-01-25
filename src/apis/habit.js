const API_BASE_URL = 'http://localhost:5005'

//habit데이터 불러오는 api 
export const fetchHabits = async (id) => {
  const response = await fetch(`${API_BASE_URL}/studies/${id}/habits`)

  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.')
  }

  const data = await response.json();
  return data;
}