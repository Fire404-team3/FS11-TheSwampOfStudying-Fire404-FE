import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { FocusBoard, TimerCard, Toast, toast } from '../../components';
import { addPoints } from '@/api/studies.api';
import storage from '@/utils/storage';
import styles from './FocusPage.module.css';

const DEFAULT_GOAL_TIME = 10 * 60; // 10분 (초 단위)
const BONUS_INTERVAL = 10 * 60; // 10분마다 보너스 포인트

export function FocusPage() {
  const [study, setStudy] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, running, paused, overtime
  const [goalTime, setGoalTime] = useState(DEFAULT_GOAL_TIME);
  const [currentTime, setCurrentTime] = useState(DEFAULT_GOAL_TIME);
  const intervalRef = useRef(null);

  // localStorage에서 currentStudy 읽기
  useEffect(() => {
    const currentStudy = storage.get('currentStudy');
    if (currentStudy) {
      setStudy(currentStudy);
    }
  }, []);

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
    const totalStudyTime = goalTime - currentTime; // 총 공부 시간
    const bonusPoints = Math.floor(totalStudyTime / BONUS_INTERVAL); // 10분당 1포인트
    return basePoints + bonusPoints;
  };

  // 시간 변경
  const handleTimeChange = (seconds) => {
    setGoalTime(seconds);
    setCurrentTime(seconds);
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
      toast.warning('🚨 집중을 중단하였습니다.');
    }
  };

  // 리셋 버튼 (10분 이상 집중했으면 보너스 포인트 지급)
  const handleReset = async () => {
    const totalStudyTime = goalTime - currentTime;
    const minutes = Math.floor(totalStudyTime / 60);

    if (minutes >= 10 && study?.id) {
      try {
        const result = await addPoints(study.id, minutes, false);
        const updatedStudy = { ...study, points: result.totalPoints };
        setStudy(updatedStudy);
        storage.set('currentStudy', updatedStudy);
        toast.success(`📚 ${result.earnedPoints}포인트를 획득했습니다!`);
      } catch (error) {
        console.error('포인트 적립 실패:', error);
      }
    }

    setStatus('idle');
    setCurrentTime(goalTime);
  };

  // 종료 버튼 (overtime 상태에서)
  const handleStop = async () => {
    const totalStudyTime = goalTime - currentTime; // 총 공부 시간 (초)
    const minutes = Math.floor(totalStudyTime / 60); // 분으로 변환

    try {
      if (study?.id) {
        const result = await addPoints(study.id, minutes, true);
        // 로컬 상태 및 localStorage 업데이트
        const updatedStudy = { ...study, points: result.totalPoints };
        setStudy(updatedStudy);
        storage.set('currentStudy', updatedStudy);
        toast.success(`🎉 ${result.earnedPoints}포인트를 획득했습니다!`);
      } else {
        const points = calculatePoints();
        toast.success(`🎉 ${points}포인트를 획득했습니다!`);
      }
    } catch (error) {
      console.error('포인트 적립 실패:', error);
      toast.warning('최소 집중 시간은 10분 이상입니다.');
    }

    setStatus('idle');
    setCurrentTime(goalTime);
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.container}>
          <FocusBoard
            nickname={study?.nickname ?? ''}
            name={study?.name ?? ''}
            points={study?.points ?? 0}
          >
            <TimerCard
              goalTime={goalTime}
              currentTime={currentTime}
              status={status}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onStop={handleStop}
              onTimeChange={handleTimeChange}
            />
          </FocusBoard>
        </div>

        <div className={styles.toastContainer}>
          <Toast />
        </div>
      </div>
    </>
  );
}
