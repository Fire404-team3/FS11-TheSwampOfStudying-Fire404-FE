import { useEffect, useState } from 'react';
import StudyExploreList from './components/StudyExploreList/StudyExploreList';

const DEBOUNCE_DELAY = 300;

export default function Home() {
  const [exploreStudies, setExploreStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const fetchStudies = async () => {
        try {
          const response = await fetch(
            `http://localhost:5050/studies?search=${searchTerm}`,
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
  }, [searchTerm]);

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
        />
      </section>
    </>
  );
}
