import StudyCard from '../StudyCard/StudyCard';

export default function StudyExploreList() {
  const dummyStudies = [
    {
      id: '1',
      name: '이유디의 UX 스터디',
      description: 'Slow And Steady Wins The Race!!',
      background: '#4A90E2', // 우선 색상값으로 테스트
      points: 310,
      createdAt: new Date('2025-11-01'),
      emojiLogs: [{ emoji: '👩‍💻' }, { emoji: '🔥' }, { emoji: '🤍' }],
    },
    {
      id: '2',
      name: '도파민 중독 탈출팀',
      description: '스마트폰 줄이기 챌린지 1기',
      background: '#FF6B6B',
      points: 1250,
      createdAt: new Date('2023-12-15'),
      emojiLogs: [],
    },
    {
      id: '3',
      name: '매일 아침 달리기',
      description: '건강한 신체에 건전한 정신',
      background:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9', // 이미지 URL 테스트
      points: 890,
      createdAt: new Date('2024-01-10'),
      emojiLogs: [{ emoji: '🏃' }],
    },
  ];

  return (
    <section>
      {console.log('렌더링 데이터', dummyStudies)}
      {dummyStudies.map((study) => (
        <StudyCard key={study.id} study={study} />
      ))}
    </section>
  );
}
