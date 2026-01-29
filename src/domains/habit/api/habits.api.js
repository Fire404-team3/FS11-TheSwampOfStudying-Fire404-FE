
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const updateHabits = async (studyId, habits) => {
  const response = await fetch(`${BASE_URL}/habits/${studyId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habits),
  });

  if (!response.ok) {
    let finalMessage = '알 수 없는 오류가 발생했습니다.';
    
    try {
      // 응답이 JSON인지 확인 후 파싱
      const errorData = await response.json();
      finalMessage = errorData.message || finalMessage;
    
    } catch (parseError) {
      // JSON 파싱 실패 시 (서버가 HTML 에러를 뱉었을 때 등)
      console.error('Failed to parse error JSON', parseError);
    }

    // 최종적으로 메시지를 담아 던짐 -> UI의 catch 블록으로 전달됨
    throw new Error(finalMessage);
  }

  return true;  //서버 성공시 NO_CONENT 전달
};