# 🔥 Fire404
(팀 협업 문서 링크 게시)

## 팀원 구성
- 백은결(https://github.com/eungyeolbaek)

- 박도담(https://github.com/crayonpeenut)

- 박수훈(https://github.com/mdeeno)

- 윤숙희(https://github.com/zoeyoon90)

- 이석우(https://github.com/dolby527)

- 최우진(https://github.com/DevWoojin97)



## 프로젝트 소개
### 공부의 숲
- 개인 공부 관리 및 커뮤니티 서비스
- 프로젝트 기간: 2026.01.20 ~ 2026.02.06

<br>

## 기술 스택
### 🎨 Frontend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=ReactRouter&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=flat-square)

---

### 🖥 Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white)

---

### 🗄 Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white)

---

### 🔧 Tools & Collaboration
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white)

---

### 🚀 Deployment
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-000000?style=flat-square&logo=Render&logoColor=white)

<br>

## 팀원별 구현 기능 상세
### 백은결
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- 소셜 로그인 기능
  - 구글 소셜 로그인 API 사용으로 소셜 로그인 기능 구현
  - 사이트 이용을 위한 추가 정보 입력 기능 구현
  - 소셜 로그인 후 회원 추가 정보 입력 기능
- user 타입(관리자, 학생)에 대한 조건부 추가 입력 모달창 기능 및 페이지 이동 기능 구현

### 박도담
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- Nav
  - 회원별 버튼 조건부 렌더링(학생: 커리어, 스킬, 수강후기, 커뮤니티, 관리자: 회원 관리 관리자 페이지)
  - 반응형 레이아웃 구현
- 메인페이지
  - fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
- 공용 Modal 컴포넌트
  - 공용으로 사용할 Modal 컴포넌트 구현

### 박수훈
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- 마이 페이지
  - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
  - 반응형 레이아웃 구현
- 공용 Button 컴포넌트
  - 공용으로 사용할 Button 컴포넌트 구현

### 윤숙희
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- 관리자 페이지
  - path parameter를 사용하여 학생 페이지와 동적 라우팅 기능 구현
  - 학생별 정보 목록 carousel 슬라이더 구현
  - fetch(PATCH, DELETE)를 사용하여 개인정보 수정 및 탈퇴 기능 구현
  - fetch(POST, PATCH, DELETE)를 사용하여 학생 정보 CRUD 기능 구현
- 공용 Button 컴포넌트
  - 공용으로 사용할 Button 컴포넌트 구현


### 이석우
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- 관리자 페이지
  - fetch(GET)를 사용하여 학생별 시간 정보 표시 및 수강생 접속 현황 정보 표시
  - 반응형 레이아웃 구현
- 마이 페이지
  - fetch(PATCH, DELETE)를 사용하여 수강생의 개인정보 수정 및 탈퇴 기능 구현
- 공용 Modal 컴포넌트
  - 공용으로 사용할 Modal 컴포넌트 구현


### 최우진
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- 마이 페이지
  - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
  - 반응형 레이아웃 구현
- 공용 Button 컴포넌트
  - 공용으로 사용할 Button 컴포넌트 구현

<br>

## 파일 구조 (예시)
```md
FS11-TheSwampOfStudying-Fire404-FE/
├── public/
│   ├── favicon.svg
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── .prettierrc
├── FeGuide.md
├── README.md
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
└── vite.config.js
```

## 구현 홈페이지
(개발한 홈페이지에 대한 링크 게시)

https://www.codeit.kr/

## 프로젝트 회고록
(제작한 발표자료 링크 혹은 첨부파일 첨부)