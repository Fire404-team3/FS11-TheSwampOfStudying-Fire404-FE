import { useState } from 'react';
import PasswordModal from './PasswordModal';
import styles from './ModalTestPage.module.css';

export default function ModalTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('edit');

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.testContainer}>
      <div className={styles.buttonGroup}>
        <button className={styles.btn} onClick={() => handleOpenModal('edit')}>
          수정하기 테스트
        </button>
        <button
          className={`${styles.btn} ${styles.delete}`}
          onClick={() => handleOpenModal('delete')}
        >
          스터디 삭제하기 테스트
        </button>
      </div>

      {isModalOpen && (
        <PasswordModal
          studyId="test-123"
          studyName="모달 테스트 페이지"
          mode={modalMode}
          onCheck={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
