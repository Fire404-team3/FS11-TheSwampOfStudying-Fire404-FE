import { apiRequest } from './index';

/**
 * 포인트 적립 API
 * @param {string} studyId - 스터디 ID
 * @param {number} minutes - 공부한 시간 (분)
 * @param {boolean} isSuccess - 집중 성공 여부
 * @returns {Promise<{ studyId: string, earnedPoints: number, totalPoints: number }>}
 */
export async function addPoints(studyId, minutes, isSuccess) {
  const response = await apiRequest(`/studies/${studyId}/points`, {
    method: 'POST',
    body: { minutes, isSuccess },
  });

  return response;
}
