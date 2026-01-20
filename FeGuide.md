# ⚠️ 아래 명령어들은 처음 프로젝트를 만든 사람 기준 설명이며, 팀원들은 저장소를 클론한 뒤 npm install만 실행하면 됩니다.

## 초기 세팅

```bash
npm create vite@latest 프로젝트이름 --template react

npm install -D prettier eslint @eslint/js

npm install clsx react-router
```

.prettierrc

```js
{
  "printWidth": 80,
  "bracketSpacing": true,
  "trailingComma": "all",
  "semi": true,
  "singleQuote": true
}
```

package.json

```json
{
  "name": "프로젝트 이름",    <------
  "private": true,
  "version": "0.0.1",
  "type": "module",

  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },

  "description": "팀 프로젝트 '프로젝트 이름' 프론트엔드", <------

  "contributors": [             <------
    { "name": "백은결" },
    { "name": "박도담" },
    { "name": "박수훈" },
    { "name": "윤숙희" },
    { "name": "이석우" },
    { "name": "최우진" }
  ],

  "engines": {      <------
    "node": ">=22.0.0"
  },

  "dependencies": {
    "clsx": "^2.1.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router": "^7.12.0"
  },

  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "babel-plugin-react-compiler": "^1.0.0",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```
