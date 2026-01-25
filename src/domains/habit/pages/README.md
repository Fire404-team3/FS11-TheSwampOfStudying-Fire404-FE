## 통합시 확인 사항 (Habit modal)

# 1. Modal 호출 방법 (개발시)

인자 : Type(studyId, habits[{}], refetchTodayHabits()) => Object
 예시 
  {isModalOpen && (
    <HabitsModal
    studyId={studyData.id}
    habits={studyData.habits.map((h) => ({
      id: h.id,
      name: h.name,
    }))}
    refetchTodayHabits={fetchStudyData} 
    onClose={() => setIsModalOpen(false)}
    />
   )}
   
# 2.App.jsx와 main.jsx 제외 후 커밋

# 3.통합시 불필요한 스크립트 : HabitsPage.jsx : Seed데이타 조회 후 Modal호출

---

## 프로젝트 순서입니다

프로젝트를 시작하실 위치에서 터미널에 아래 명령어를 순서대로 입력해주세요

```bash
git clone https://github.com/Fire404-team3/FS11-TheSwampOfStudying-Fire404-FE.git

npm install
```
