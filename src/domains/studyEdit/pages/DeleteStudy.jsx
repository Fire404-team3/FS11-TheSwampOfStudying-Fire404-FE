import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteStudy } from '@/api/studyCreateEditApi';

/**
 * [스터디 삭제]
 * 비밀번호 모달 통과시 실행됨
 * API 삭제 요청 -> 메인페이지로 이동
 */
const DeleteStudy = ({ studyId, onClose }) => {
  const navigate = useNavigate();

  // 모달에서 비밀번호 눌렀을 때 실행
  const handleDeleteConfirm = async (password) => {
    try {
      // 1. 스터디 삭제 API 호출
      await deleteStudy(studyId, password);

      // 2. 성공 처리 및 모달 닫기
      toast.success('스터디가 삭제되었습니다.');
      onClose();

      // 3. 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      toast.error(error.message || '삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <PasswordModal
      studyId={studyId}
      studyName="스터디 삭제" // 혹은 부모에서 받은 이름
      mode="delete"
      onCheck={handleDeleteConfirm}
      onClose={onClose}
    />
  );
};

export default DeleteStudy;
