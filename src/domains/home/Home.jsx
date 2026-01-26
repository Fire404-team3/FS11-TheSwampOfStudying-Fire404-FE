import { useEffect, useState } from 'react';
import StudyExploreList from './components/StudyExploreList/StudyExploreList';

const SORT_OPTION = {
  created_desc: { sort: 'createdAt', order: 'desc' },
  created_asc: { sort: 'createdAt', order: 'asc' },
  points_desc: { sort: 'points', order: 'desc' },
  points_asc: { sort: 'points', order: 'asc' },
};

const DEBOUNCE_DELAY = 300;

export default function Home() {
  const [exploreStudies, setExploreStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('created_desc');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const fetchStudies = async () => {
        try {
          const { sort, order } = SORT_OPTION[sortOrder];

          const params = new URLSearchParams({
            search: searchTerm,
            sort: sort,
            order: order,
          });

          const response = await fetch(
            `http://localhost:5050/studies?${params.toString()}`,
          );
          const result = await response.json();

          setExploreStudies(result.data || []);
        } catch (error) {
          console.error('데이터 로드 실패', error);
        }
      };
      fetchStudies();
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, sortOrder]);

  return (
    <>
      <section>
        <h2>최근 조회한 스터디</h2>
      </section>
      <section>
        <h2>스터디 둘러보기</h2>
        <StudyExploreList
          studies={exploreStudies}
          onSearchChange={setSearchTerm}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      </section>
    </>
  );
}
