## 브랜치 최신화 하는 방법
요약
```bash
# 1. 로컬 develop 브랜치 최신화:
git switch develop && git pull origin develop

# 2. 자기 feature 브랜치로 이동:
git switch feature/브랜치이름

# 3. 최신 develop 내용 반영:
git merge develop (또는 git rebase develop)

# 4. 작업 후 원격 feature 브랜치로 푸시:
git push origin feature/브랜치이름
```

1️⃣ 최신 develop 가져오기
```bash
# develop 브랜치로 이동
git switch develop

# 원격 저장소의 최신 develop 가져오기
git pull origin develop
```
2️⃣ 자기 feature 브랜치로 이동
```bash
git switch feature/자기브랜치이름
```
3️⃣ 최신 develop 내용 머지 혹은 리베이스
```bash
# 머지 방법 (안정적, 충돌 발생 시 해결)
git merge develop

# 충돌(conflict) 있으면 터미널에서 충돌 해결 후
git add .
git commit

# 리베이스 방법 (커밋 히스토리를 깔끔하게)
git rebase develop

# 충돌 발생 시 충돌 해결 후

git add .
git rebase --continue
```
4️⃣ 자기 원격 feature 브랜치로 푸시
```bash
git push origin feature/자기브랜치이름
# 리베이스 한 경우 --force-with-lease 붙여서 강제로 푸시

git push --force-with-lease origin feature/자기브랜치이름
```


## 프로젝트 순서입니다
프로젝트를 시작하실 위치에서 터미널에 아래 명령어를 순서대로 입력해주세요

```bash
git clone https://github.com/testtesttttttttttttttttt/FE-Repo.git

npm install
```