import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { FocusBoard, TimerCard, Toast } from '../../components';
import styles from './FocusPage.module.css';

const GOAL_TIME = 25 * 60; // 25분 (초 단위)
const BONUS_INTERVAL = 10 * 60; // 10분마다 보너스 포인트

export function FocusPage() {
  const [status, setStatus] = useState('idle'); // idle, running, paused, overtime
  const [currentTime, setCurrentTime] = useState(GOAL_TIME);
  const [toast, setToast] = useState({ visible: false, variant: 'success', message: '' });
  const intervalRef = useRef(null);

  // 타이머 로직
  useEffect(() => {
    if (status === 'running' || status === 'overtime') {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev - 1;

          // 목표 시간 달성 (0에 도달)
          if (prev === 1 && status === 'running') {
            setStatus('overtime');
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  // 포인트 계산
  const calculatePoints = () => {
    const basePoints = 3; // 성공 포인트
    const totalStudyTime = GOAL_TIME - currentTime; // 총 공부 시간
    const bonusPoints = Math.floor(totalStudyTime / BONUS_INTERVAL); // 10분당 1포인트
    return basePoints + bonusPoints;
  };

  // 토스트 표시
  const showToast = (variant, message) => {
    setToast({ visible: true, variant, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // 시작 버튼
  const handleStart = () => {
    if (status === 'paused') {
      setStatus('running');
    } else if (status === 'idle') {
      setStatus('running');
    }
  };

  // 일시정지 버튼
  const handlePause = () => {
    if (status === 'running') {
      setStatus('paused');
      showToast('warning', '집중이 중단되었습니다.');
    }
  };

  // 리셋 버튼
  const handleReset = () => {
    setStatus('idle');
    setCurrentTime(GOAL_TIME);
  };

  // 종료 버튼 (overtime 상태에서)
  const handleStop = () => {
    const points = calculatePoints();
    showToast('success', `${points}포인트를 획득했습니다!`);
    setStatus('idle');
    setCurrentTime(GOAL_TIME);
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <FocusBoard studyName="연우의 개발공장" points={310}>
          <TimerCard
            goalTime={GOAL_TIME}
            currentTime={currentTime}
            status={status}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onStop={handleStop}
          />
        </FocusBoard>
      </div>

      <div className={styles.toastContainer}>
        <Toast
          variant={toast.variant}
          message={toast.message}
          visible={toast.visible}
        />
      </div>
    </div>
  );
}
