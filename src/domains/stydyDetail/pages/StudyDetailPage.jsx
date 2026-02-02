import HabitRecord from '../components/HabitRecord/HabitRecord';
import styles from './StudyDetailPage.module.css';
import { LinkButton } from '@/components/LinkButton';
import pointImg from '@/assets/ic_point.svg';
import { useEffect, useState } from 'react';
import { fetchAllResourcesList } from '@/api/studyDetail';
import { useNavigate, useParams } from 'react-router';
import { checkStudyPassword, deleteStudy } from '@/api/studyCreateEditApi';
import toast from 'react-hot-toast';
import PasswordModal from '@/components/PasswordModal';

function StudyDetailPage({ to, className }) {
  // 임시로 주어진 id 값 - [수훈] 테스트를 위해 잠시 주석처리
  // const id = 'cml0jndun0000qoscmihfh6eq';

  // [수훈] useParams에서 ID 가져오기, 네비게이트 연결
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studyName, setStudyName] = useState('');
  const [point, setPoint] = useState('');
  const [description, setDescription] = useState('');
  const [habits, setHabits] = useState([]);

  // [수훈] 비밀번호 모달 관리, 수정/삭제용 모달 각각 관리
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const allResourcesList = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchAllResourcesList(id);
        setStudyName(result.data.name);
        setPoint(result.data.points);
        setDescription(result.data.description);

        setHabits(result.data.habits || []); // [수훈] habits가 없으면 빈 배열
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    allResourcesList();
  }, [id]); // [수훈] ,habits 의존성 제거(무한 루프 방지)

  // [수훈] 1. 수정 관련 기능(비밀번호 모달 -> 수정페이지 이동)
  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };
  const handleUpdateConfirm = async (password) => {
    // 입력 비밀번호 확인
    console.log('확인하려고 입력한 비번:', password);
    try {
      // 비밀번호 맞는지 확인
      await checkStudyPassword(id, password);

      // 맞으면 모달 닫고 수정 페이지로 이동
      setIsUpdateModalOpen(false);
      navigate(`/studies/${id}/update`, { state: { password } });
    } catch (err) {
      console.error(err);
      toast.error('비밀번호가 일치하지 않습니다.');
    }
  };

  // [수훈] 2. 삭제 관련 기능(비밀번호 모달 -> 삭제 -> 메인으로 이동)
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirm = async (password) => {
    try {
      // 삭제 요청
      await deleteStudy(id, password);

      // 맞으면 성공 토스트 띄우고 메인으로 이동
      toast.success('스터디가 삭제되었습니다.');
      setIsDeleteModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('삭제 실패: 비밀번호를 확인해주세요.');
    }
  };

  // [수훈] 상태관리에 loading과 error의 에러 방지용
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

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

              {/* [수훈] onClick 추가 */}
              <button className={styles.studyFix} onClick={handleUpdateClick}>
                수정하기
              </button>
              <p>|</p>
              {/* [수훈] onClick 추가 */}
              <button onClick={handleDeleteClick}>스터디 삭제하기</button>
            </div>
          </div>
          <div className={styles.secondNev}>
            <div className={styles.studyName}>{studyName}</div>
            <div className={styles.moveBtn}>
              {/* [수훈] to={} 수정필요 */}
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
            habits.map((habit, index) => (
              <HabitRecord key={habit.id} habit={habit} index={index} />
            ))
          )}
        </div>
      </div>

      {/* 모달 배치 */}
      {/* 1. 수정 모달 */}
      {isUpdateModalOpen && (
        <PasswordModal
          studyId={id}
          studyName="스터디 수정 권한 확인"
          mode="edit"
          onCheck={handleUpdateConfirm}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}

      {/* 2. 삭제 모달 */}
      {isDeleteModalOpen && (
        <PasswordModal
          studyId={id}
          studyName="스터디 삭제"
          mode="delete"
          onCheck={handleDeleteConfirm}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default StudyDetailPage;
