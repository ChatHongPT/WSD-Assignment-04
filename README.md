# 🚀 Movie WebSite Project

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-4.x-blueviolet?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square&logo=typescript)
![Kakao](https://img.shields.io/badge/Kakao-Login-yellow?style=flat-square&logo=kakao)

## 📝 소개
Movie Archive 프로젝트는 Vue 3와 Vite를 기반으로 만들어진 SPA(Single Page Application)입니다. 카카오 로그인 기능과 GitHub Pages 배포를 지원하며, 빠르고 효율적인 웹 애플리케이션을 제공합니다.

## 📂 디렉토리 구조
```
.
├── public/             # 정적 파일
├── src/                # 소스 코드
│   ├── components/    # Vue 컴포넌트
│   ├── assets/        # 이미지 및 스타일 파일
│   └── main.ts        # 진입 파일
├── vite.config.ts      # Vite 설정 파일
└── package.json        # 의존성 및 스크립트 설정
```

## 🚀 실행 방법

### 1️⃣ 개발 환경에서 실행 (Dev 모드)
개발 모드는 실시간 변경 사항을 반영하며 빠른 개발 사이클을 제공합니다.

```bash
# 종속성 설치
npm install

# 개발 서버 실행
npm run dev
```

- 실행 후 브라우저에서 [`http://localhost:3000`](http://localhost:3000)으로 접속하세요.

---

### 2️⃣ 프로덕션 환경에서 실행 (Prod 모드)
프로덕션 모드는 실제 배포 환경을 시뮬레이션합니다.

```bash
# 프로덕션 서버 실행
npm run prod
```

- 최적화된 빌드 결과물을 생성하며, 안정적인 실행 환경을 제공합니다.

---

### 3️⃣ 빌드 및 미리보기

#### 빌드
```bash
npm run build
```
- 빌드 결과물이 `dist/` 디렉토리에 생성됩니다.

#### 빌드 결과물 미리보기
```bash
npm run preview
```
- 로컬 서버에서 빌드된 파일을 미리보기로 확인할 수 있습니다.

---

### 4️⃣ 타입 체킹(Type Checking)
TypeScript 타입 오류를 확인합니다.
```bash
npm run typecheck
```

## 🌟 주요 기능
- 📱 **카카오 로그인**: Kakao SDK를 이용한 OAuth 2.0 인증.
- ⚡ **빠른 로딩**: Vite와 Vue의 조합으로 빠른 성능 제공.
- 🌐 **SPA 지원**: GitHub Pages에서 Single Page Application 지원.

## 🔗 배포
GitHub Pages에 배포되어 있습니다. 아래 링크를 통해 프로젝트를 확인하세요:
[프로젝트 링크](https://chathongpt.github.io/WSD-Assignment-04)

## 🤝 기여 방법
1. 이 리포지토리를 포크합니다.
2. 새로운 브랜치를 생성합니다: `git checkout -b feature/새로운기능`
3. 변경 사항을 커밋합니다: `git commit -m 'Add 새로운 기능'`
4. 브랜치에 푸시합니다: `git push origin feature/새로운기능`
5. 풀 리퀘스트를 생성합니다.

## 🛠️ 사용된 기술
- **Vue.js**: 사용자 인터페이스 구축
- **Vite**: 빠른 개발 서버와 빌드 도구
- **TypeScript**: 정적 타입 검사
- **Kakao SDK**: 로그인 인증

---

💡 추가 질문이나 제안 사항이 있으면 언제든지 [Issues](https://github.com/username/WSD-Assignment-04/issues)에 등록해주세요!
