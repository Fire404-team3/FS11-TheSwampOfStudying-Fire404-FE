const API_BASE_URL = 'http://localhost:5005'

//habit데이터 불러오는 api 
export const fetchHabitList = async (id) => {
  const response = await fetch(`${API_BASE_URL}/studies/${id}/habits`)

  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.')
  }

  const data = await response.json();
  return data;
}

//오늘의 습관에서 실행한 습관 클릭시 habitRecord에 checkDate날짜 생성
export const creatHabitCheckDate = async (id, checkDate) => {
  const response = await fetch(`${API_BASE_URL}/habits/${id}/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checkDate }),
  });

  if (!response.ok) {
    throw new Error('checkDate 추가 생성 실패했습니다.');
  }

  return response.json();
};
