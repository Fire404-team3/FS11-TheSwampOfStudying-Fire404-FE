// habits.api.js - PR 리뷰 후 UI로직으로부터 별도 분리
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateHabits = async (studyId, habits) => {
  const response = await fetch(`${BASE_URL}/habits/${studyId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habits),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return; 
};