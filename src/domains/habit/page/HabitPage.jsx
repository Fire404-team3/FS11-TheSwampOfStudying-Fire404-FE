import { useEffect, useState } from 'react';
import DailyHabit from '../components/DailyHabit/DailyHabit';
import styles from './HabitPage.module.css';
import { LinkButton } from '@/components/LinkButton';
import { fetchHabitList } from '@/api/habits.api';
import { useParams } from 'react-router';
import { Header } from '@/components/Header';

function HabitPage({ className }) {
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
      // console.log(result.data);
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
    }, INTERVAL_TIME); //10초에 한번씩...
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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  return (
    <>
      <Header />
      <div className={styles.habitContainer}>
        <div className={styles.habitBox}>
          <div className={styles.navTop}>
            {/* 여기{study.name}으로 교체 */}
            <p className={styles.studyNameTitle}>
              {nickName}의 {studyName}
            </p>
            <div className={styles.moveBtnContainer}>
              {/* 페이지 이동 연결 해야함  */}
              <LinkButton to={`/studies/${id}/focus`} className={className}>
                오늘의 집중
              </LinkButton>
              <LinkButton to="/" className={className}>
                홈
              </LinkButton>
            </div>
          </div>

          <div className={styles.timeContainer}>
            <p className={styles.nowTimeWord}>현재 시간</p>
            <div className={styles.imRealClock}>{formatDateTime(current)}</div>
          </div>

          {/* 임의로 id값 부여  */}
          <DailyHabit
            habitList={habitList}
            studyId={studyId}
            refetchTodayHabits={dailyHabitlist}
          />
          {/* 넘어오지 마시오  */}
        </div>
      </div>
    </>
  );
}

export default HabitPage;
