import styles from './StudyGrid.module.css';

const EmptyMessage = ({ searchTerm }) => {
  return (
    <div className={styles.emptyContainer}>
      <p>
        {searchTerm
          ? `${searchTerm}에 대한 검색 결과가 없습니다.`
          : '아직 둘러 볼 스터디가 없습니다.'}
      </p>
    </div>
  );
};
export default EmptyMessage;
