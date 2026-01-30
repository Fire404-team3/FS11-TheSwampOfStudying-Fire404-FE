import HabitRecord from '../components/HabitRecord/HabitRecord';
import styles from './StudyDetailPage.module.css';
import { LinkButton } from '@/components/LinkButton';
import pointImg from '@/assets/ic_point.svg';
import { useEffect, useState } from 'react';
import { fetchAllResourcesList } from '@/api/studyDetail';

function StudyDetailPage({ to, className }) {
  // 임시로 주어진 id 값
  const id = 'cml0jndun0000qoscmihfh6eq';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studyName, setStudyName] = useState('');
  const [point, setPoint] = useState('');
  const [description, setDescription] = useState('');
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const allResourcesList = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchAllResourcesList(id);
        setStudyName(result.data.name);
        setPoint(result.data.points);
        setDescription(result.data.description);
        setHabits(result.data.habits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    allResourcesList();
  }, [id,habits]);

  return (
    <div className={styles.datailPageContainer}>
      <div className={styles.datailBox}>
        {/* 스터디 정보 */}
        <div className={styles.infoContainer}>
          <div className={styles.firstNev}>
            <div>이모지</div>
            <div className={styles.fixBtns}>
              <button className={styles.Share}>공유하기</button>
              <p>|</p>
              <button className={styles.studyFix}>수정하기</button>
              <p>|</p>
              <button>스터디 삭제하기</button>
            </div>
          </div>
          <div className={styles.secondNev}>
            <div className={styles.studyName}>{studyName}</div>
            <div className={styles.moveBtn}>
              <LinkButton to={to} className={className}>
                오늘의 습관
              </LinkButton>
              <LinkButton to={to} className={className}>
                오늘의 집중
              </LinkButton>
            </div>
          </div>
          <div className={styles.description}>
            <p>소개</p>
            <div>{description}</div>
          </div>

          <p>현재까지 획득한 포인트</p>
          <div className={styles.point}>
            <img src={pointImg} className={styles.pointIcon} />
            {point}p 획득
          </div>
        </div>
        <div className={styles.weeklyHabitbox}>
          <p className={styles.weeklyTitle}>습관 기록표</p>
          {/* 습관기록표 */}


          {habits.length === 0 ? (
            <p>
              아직 습관이 없어요
              <br />
              오늘의 습관에서 습관을 생성해보세요
            </p>
          ) : (
            habits.map((habit,index) => <HabitRecord key={habit.id} habit={habit} index={index} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyDetailPage;
