import { useEffect, useState } from 'react';
import DailyHabit from '../components/DailyHabit/DailyHabit';
import styles from './HabitPage.module.css';
import { LinkButton } from '@/components/LinkButton';
import { fetchHabitList } from '@/api/habits.api';
import { useParams } from 'react-router';
import { Header } from '@/components/Header';

function HabitPage() {
  const { id } = useParams();
  const INTERVAL_TIME = 10000;
  const [current, setCurrent] = useState(new Date());

  const [habitList, setHabitList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studyName, setStudyName] = useState('');
  const [nickName, setNickName] = useState('');
  const [studyId, setStudyId] = useState('');

  const dailyHabitlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchHabitList(id);
      setHabitList(result.data.habits);
      setStudyName(result.data.name);
      setNickName(result.data.nickname);
      setStudyId(result.data.id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    dailyHabitlist();
  }, [id]);

  //날짜,시간 업로드
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent(new Date());
    }, INTERVAL_TIME); //10초에 한번
    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    const dateStr = date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace('.', '');

    const timeStr = date.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
    });

    return `${dateStr} ${timeStr}`;
  };
  // 상태관리에 loading과 error의 에러 방지용
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <Header />
      <div className={styles.habitContainer}>
        <div className={styles.habitBox}>
          <div className={styles.navTop}>
            <div className={styles.nameWrapper}>
              <div className={styles.studyName}>
                {nickName}의 {studyName}
              </div>
            </div>
            <div className={styles.moveBtnContainer}>
              <LinkButton to={`/studies/${id}/focus`} >
                오늘의 집중
              </LinkButton>
              <LinkButton to="/" >
                홈
              </LinkButton>
            </div>
          </div>

          <div className={styles.timeContainer}>
            <p className={styles.nowTimeWord}>현재 시간</p>
            <div className={styles.imRealClock}>{formatDateTime(current)}</div>
          </div>

          <DailyHabit
            habitList={habitList}
            studyId={studyId}
            refetchTodayHabits={dailyHabitlist}
          />
        </div>
      </div>
    </>
  );
}

export default HabitPage;
