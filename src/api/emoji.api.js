const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

// 이모지 비활성화 시 click -> 이모지 카운트 1 증가
export const increaseEmoji = async ({ studyId, emojiType }) => {
  const response = await fetch(`${BASE_URL}/studies/${studyId}/emojis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emojiType }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error('이모지를 추가하는데 실패했습니다.');
  }

  return result;
};

// 이모지 활성화 시 click -> 이모지 카운트 1 감소
// PATCH 백엔드 API 추가 필요
export const decreaseEmoji = async ({ studyId, emojiType }) => {
  const response = await fetch(`${BASE_URL}/studies/${studyId}/emojis`, {
    method: 'PATCH', // 예정
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emojiType }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '이모지 처리 중 오류가 발생했습니다.');
  }

  return result;
};
