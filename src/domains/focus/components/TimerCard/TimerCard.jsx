import styles from './TimerCard.module.css';
import icTimer from '@/assets/ic_timer.svg';
import btnPause from '@/assets/btn_pause.svg';
import btnRestart from '@/assets/btn_restart.svg';
import icPlay from '@/assets/ic_play.svg';

/**
 * @param {Object} props
 * @param {number} props.goalTime - 목표 시간 (초 단위)
 * @param {number} props.currentTime - 현재 남은 시간 (초 단위, 음수일 경우 초과)
 * @param {'idle' | 'running' | 'paused' | 'overtime'} props.status - 타이머 상태
 * @param {() => void} props.onStart - 시작 버튼 클릭
 * @param {() => void} props.onPause - 일시정지 버튼 클릭
 * @param {() => void} props.onReset - 리셋 버튼 클릭
 * @param {() => void} props.onStop - 종료 버튼 클릭
 */
export function TimerCard({
  goalTime,
  currentTime,
  status = 'idle',
  onStart,
  onPause,
  onReset,
  onStop,
}) {
  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    return isNegative ? `-${formatted}` : formatted;
  };

  const isWarning = status === 'running' && currentTime <= 10 && currentTime > 0;
  const isOvertime = status === 'overtime' || currentTime < 0;
  const showGoalBadge = status !== 'idle';

  const getTimerClassName = () => {
    if (isOvertime) return `${styles.timer} ${styles.overtime}`;
    if (isWarning) return `${styles.timer} ${styles.warning}`;
    return styles.timer;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>오늘의 집중</h2>

      {showGoalBadge && (
        <div className={styles.goalBadge}>
          <img src={icTimer} alt="타이머" className={styles.clockIcon} />
          <span>{formatTime(goalTime)}</span>
        </div>
      )}

      <div className={getTimerClassName()}>
        {formatTime(currentTime)}
      </div>

      <div className={styles.buttons}>
        {status === 'idle' && (
          <button className={styles.mainButton} onClick={onStart}>
            <img src={icPlay} alt="재생" style={{ width: '2.75rem', height: '2.75rem' }} />
            Start!
          </button>
        )}

        {(status === 'running' || status === 'paused') && (
          <>
            <img src={btnPause} alt="일시정지" className={styles.circleButton} onClick={onPause} />
            <button className={`${styles.mainButton} ${status === 'running' ? styles.running : ''}`} onClick={onStart}>
              <img src={icPlay} alt="재생" style={{ width: '2.75rem', height: '2.75rem' }} />
              Start!
            </button>
            <img src={btnRestart} alt="리셋" className={styles.circleButton} onClick={onReset} />
          </>
        )}

        {status === 'overtime' && (
          <button className={styles.mainButton} onClick={onStop}>
            <span className={styles.stopIcon}>⏹</span>
            Stop!
          </button>
        )}
      </div>
    </div>
  );
}
