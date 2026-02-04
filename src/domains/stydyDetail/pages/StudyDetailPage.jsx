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
import { Header } from '@/components/Header';

function StudyDetailPage() {
  // [수훈] useParams에서 ID 가져오기, 네비게이트 연결
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studyName, setStudyName] = useState('');
  const [nickName, setNickName] = useState('');
  const [point, setPoint] = useState('');
  const [description, setDescription] = useState('');
  const [habits, setHabits] = useState([]);
  const [study, setStudy] = useState(null);

  // [수훈] 비밀번호 모달 관리, 수정/삭제용 모달 각각 관리
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // [숙희] 오늘의 습관,집중 진입시 비밀번호 모달 각각 관리
  const [isTodayHabitOpen, setIsTodayHabitOpen] = useState(false);
  const [isTodayFocusOpen, setIsTodayFocusOpen] = useState(false);

  const allResourcesList = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchAllResourcesList(id);
      setStudy(result.data);
      setStudyName(result.data.name);
      setNickName(result.data.nickname)
      setPoint(result.data.points);
      setDescription(result.data.description);

      setHabits(result.data.habits || []); // [수훈] habits가 없으면 빈 배열
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allResourcesList();
  }, [id]);
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

      // 수정하기에 갈땐 password 챙겨서 가기
      navigate(`/studies/${id}/update`, { state: { password: password } });
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
      console.log(password);
      // 맞으면 성공 토스트 띄우고 메인으로 이동
      alert('스터디가 삭제되었습니다.');
      setIsDeleteModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('비밀번호가 일치하지 않습니다.');
    }
  };

  //[숙희] 3. 오늘의 습관 진입시 비밀번호 모달 확인 후 진입
  const handleTodayHabitClick = () => {
    setIsTodayHabitOpen(true);
  };
  const handleTodayHabitConfirm = async (password) => {
    //비밀번호 확인
    console.log('확인하려고 입력한 비번:', password);
    try {
      await checkStudyPassword(id, password);
      //맞으면 모달 닫고 페이지 이동
      setIsTodayHabitOpen(false);
      //이동할때 password챙겨서 이동
      navigate(`/studies/${id}/habits`, { state: { password: password } });
    } catch (error) {
      console.error(error);
      toast.error('비밀번호가 일치하지 않습니다.');
    }
  };

  //[숙희] 4. 오늘의 집중 진입시 비밀번호 모달 확인 후 진입
  const handleTodayFocusClick = () => {
    setIsTodayFocusOpen(true);
  };
  const handleTodayFocusConfirm = async (password) => {
    //비밀번호 확인
    console.log('확인하려고 입력한 비번:', password);
    try {
      await checkStudyPassword(id, password);
      //맞으면 모달 닫고 페이지 이동
      setIsTodayFocusOpen(false);
      //이동할때 password챙겨서 이동
      navigate(`/studies/${id}/focus`, { state: { password: password } });
    } catch (error) {
      console.error(error);
      toast.error('비밀번호가 일치하지 않습니다.');
    }
  };

  // [수훈] 상태관리에 loading과 error의 에러 방지용
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <Header />
      <div className={styles.datailPageContainer}>
        <div className={styles.datailBox}>
          <div className={styles.infoContainer}>
            <div className={styles.firstNev}>
              {/* <div>
                {study && (
                  <EmojiList study={study} onRefresh={allResourcesList} />
                )}
              </div> */}

              <div className={styles.fixBtns}>
                <button className={styles.Share}>공유하기</button>
                <span>|</span>
                <button className={styles.studyFix} onClick={handleUpdateClick}>
                  수정하기
                </button>
                <span>|</span>
                <button
                  onClick={handleDeleteClick}
                  className={styles.deleteStudy}
                >
                  스터디 삭제하기
                </button>
              </div>
            </div>

            <div className={styles.secondNev}>
              <div className={styles.nameWrapper}>
              <div className={styles.studyName}>
                {nickName}의 {studyName}
              </div>

              </div>


              <div className={styles.moveBtn}>
                <LinkButton
                  to={`/studies/${id}/habits`}
                  onClick={handleTodayHabitClick}
                >
                  오늘의 습관
                </LinkButton>
                <LinkButton
                  to={`/studies/${id}/focus`}
                  onClick={handleTodayFocusClick}
                >
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
          <HabitRecord habits={habits} />
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

        {/* 3. 오늘의 습관 진입 모달 */}
        {isTodayHabitOpen && (
          <PasswordModal
            studyId={id}
            studyName="오늘의 습관"
            mode="habits"
            onCheck={handleTodayHabitConfirm}
            onClose={() => setIsTodayHabitOpen(false)}
          />
        )}

        {/* 4. 오늘의 집중 진입 모달 */}
        {isTodayFocusOpen && (
          <PasswordModal
            studyId={id}
            studyName="오늘의 집중"
            mode="focus"
            onCheck={handleTodayFocusConfirm}
            onClose={() => setIsTodayFocusOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default StudyDetailPage;
