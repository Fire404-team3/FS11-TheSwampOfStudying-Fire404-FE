import { apiRequest } from './index';

/**
 * 포인트 적립 API
 * @param {string} studyId - 스터디 ID
 * @param {number} minutes - 공부한 시간 (분)
 * @returns {Promise<{ studyId: string, earnedPoints: number, totalPoints: number }>}
 */
export async function addPoints(studyId, minutes) {
  const response = await apiRequest(`/studies/${studyId}/points`, {
    method: 'POST',
    body: { minutes },
  });

  return response.data;
}
