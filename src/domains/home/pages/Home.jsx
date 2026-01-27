import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import StudyExploreList from '../components/StudyExploreList';
import { getStudies } from '@/api/studyApi';
import Header from '@/common/components/Header';
import RecentStudyList from '../components/RecentStudyList/RecentStudyList';

const SORT_OPTION = {
  created_desc: { sort: 'createdAt', order: 'desc' },
  created_asc: { sort: 'createdAt', order: 'asc' },
  points_desc: { sort: 'points', order: 'desc' },
  points_asc: { sort: 'points', order: 'asc' },
};

const DEBOUNCE_DELAY = 300;
const LIMIT = 6;

export default function Home() {
  const [exploreStudies, setExploreStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('created_desc');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const fetchStudies = async () => {
        try {
          const { sort, order } = SORT_OPTION[sortOrder];

          const result = await getStudies({
            search: searchTerm,
            sort,
            order,
            page: currentPage,
            limit: LIMIT,
          });

          setExploreStudies(result.data || []);
          setTotalCount(result.meta.totalCount);
        } catch (error) {
          console.error('데이터 로드 실패', error);
        }
      };
      fetchStudies();
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, sortOrder, currentPage]);

  return (
    <div className={styles.fullPageWrapper}>
      <Header />
      <section>
        <RecentStudyList />
      </section>
      <section>
        <StudyExploreList
          studies={exploreStudies}
          onSearchChange={setSearchTerm}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalCount={totalCount}
          limit={LIMIT}
        />
      </section>
    </div>
  );
}
