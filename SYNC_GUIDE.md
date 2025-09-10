# 🔄 BadgeGenerator 동기화 가이드

## 📋 개요
Google Sheets 데이터를 이용한 배지 자동 생성 시스템의 동기화 방법을 설명합니다.

## 🏗️ 프로젝트 구조
```
BadgeGenerator/
├── .git/                    # Git 저장소
├── .vscode/                 # Cursor/VS Code 설정
├── src/                     # 소스 코드
│   ├── js/                  # JavaScript 파일
│   ├── css/                 # 스타일시트
│   └── assets/              # 이미지, 폰트 등
├── config/                  # 설정 파일
├── templates/               # 배지 템플릿
├── output/                  # 생성된 배지 파일
├── index.html               # 메인 페이지
├── server.js                # Express 서버
├── package.json             # Node.js 의존성
└── SYNC_GUIDE.md            # 동기화 가이드
```

## 🔄 동기화 방법

### 1. Google Drive + Git 하이브리드 방식 (현재 설정)

#### 장점
- ✅ Google Drive: 실시간 백업 및 편의성
- ✅ Git: 버전 관리 및 충돌 해결
- ✅ 자동 동기화: Google Drive가 자동으로 파일 동기화
- ✅ 안전한 백업: Git으로 변경 이력 관리

#### 설정 완료 상태
- ✅ Git 저장소 초기화 완료
- ✅ .gitignore 파일 설정 완료
- ✅ 프로젝트 구조 생성 완료

### 2. 다른 컴퓨터에서 작업하기

#### 첫 번째 설정 (다른 컴퓨터에서)
```bash
# 1. Google Drive 동기화 대기
# - Google Drive Desktop 앱 설치
# - Google 계정 로그인
# - "내 드라이브" 폴더 동기화 완료까지 대기

# 2. Cursor로 프로젝트 열기
# - Cursor 실행
# - File → Open Folder
# - "G:\내 드라이브\Cursor\BadgeGenerator" 선택

# 3. Git 설정 (선택사항)
cd "G:\내 드라이브\Cursor\BadgeGenerator"
git status  # Git 상태 확인
```

#### 일상적인 워크플로우
```bash
# 작업 시작 전
git pull origin main  # (GitHub 연결 후)

# 작업 완료 후
git add .
git commit -m "작업 내용: 기능 추가/수정/버그 수정"
git push origin main  # (GitHub 연결 후)
```

## 🚀 프로젝트 실행 방법

### 1. 의존성 설치
```bash
# Node.js가 설치되어 있어야 함
npm install
```

### 2. Google Sheets API 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. Google Sheets API 활성화
4. API 키 생성
5. `config/sheets-config.js`에서 API 키 설정

### 3. Google Sheets 설정
1. 참여자 데이터가 있는 Google Sheets 생성
2. 시트 ID 복사 (URL에서 추출)
3. `config/sheets-config.js`에서 시트 ID 설정

### 4. 애플리케이션 실행
```bash
# 개발 서버 시작
npm start

# 또는 직접 실행
node server.js
```

### 5. 브라우저에서 접속
```
http://localhost:3000
```

## 📊 사용 방법

### 1. Google Sheets 연결
1. "Google Sheets ID" 입력
2. "연결 테스트" 버튼 클릭
3. 연결 성공 확인

### 2. 데이터 불러오기
1. "데이터 불러오기" 버튼 클릭
2. 시트에서 데이터 자동 로드
3. 데이터 미리보기 확인

### 3. 배지 생성
1. 배지 템플릿 선택
2. 배지 크기 선택
3. 출력 수량 설정
4. "배지 생성" 버튼 클릭

### 4. 프린트
1. 프린터 선택
2. "프린트" 버튼 클릭
3. 프린트 대화상자에서 출력

## 🔧 설정 관리

### 자동 저장
- 설정 변경 시 자동으로 로컬 스토리지에 저장
- 브라우저를 닫아도 설정 유지

### 설정 내보내기/가져오기
- "설정 내보내기": 현재 설정을 JSON 파일로 저장
- "설정 가져오기": JSON 파일에서 설정 복원

### 키보드 단축키
- `Ctrl+S`: 수동 저장
- `Ctrl+R`: 데이터 새로고침
- `Ctrl+P`: 배지 생성 및 프린트

## 🚨 주의사항

### Google Drive 동기화
- **동시 작업 금지**: 같은 파일을 여러 컴퓨터에서 동시에 편집하지 말 것
- **동기화 확인**: 작업 전 Google Drive 동기화 완료 확인
- **충돌 방지**: 두 컴퓨터에서 동시에 작업하면 충돌 발생 가능

### Git 사용 시
- **커밋 메시지**: 명확하고 구체적인 커밋 메시지 작성
- **정기적 푸시**: 작업 완료 후 즉시 push 실행
- **충돌 해결**: 충돌 발생 시 수동으로 해결

### Google Sheets API
- **API 할당량**: 일일 API 호출 제한 확인
- **권한 설정**: 시트에 대한 읽기 권한 확인
- **네트워크 연결**: API 사용을 위해 인터넷 연결 필수

## 🔍 문제 해결

### Google Drive 동기화 문제
1. Google Drive 앱 재시작
2. 네트워크 연결 확인
3. 저장 공간 확인
4. 파일 권한 확인

### Git 충돌 해결
```bash
# 충돌 파일 확인
git status

# 충돌 부분 수동 편집
# <<<<<<< HEAD
# 현재 브랜치 내용
# =======
# 병합할 브랜치 내용
# >>>>>>> branch-name

# 해결 후 커밋
git add .
git commit -m "충돌 해결"
```

### Google Sheets 연결 실패
1. API 키 확인
2. 시트 ID 확인
3. 시트 권한 확인
4. 네트워크 연결 확인

### 프린트 문제
1. 프린터 드라이버 설치 확인
2. 프린터 연결 상태 확인
3. 용지 및 잉크 확인
4. 브라우저 팝업 차단 해제

## 📞 지원

### 공식 문서
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Express.js**: https://expressjs.com/
- **Git**: https://git-scm.com/doc

### 커뮤니티
- **GitHub Issues**: 프로젝트별 이슈 보고
- **Stack Overflow**: 기술적 문제 해결
- **Google Drive 지원**: https://support.google.com/drive

## 🎯 결론

이 프로젝트는 Google Drive + Git 하이브리드 방식으로 동기화되며:

1. **Google Drive**: 실시간 백업 및 편의성
2. **Git**: 버전 관리 및 충돌 해결
3. **자동화**: Google Sheets 데이터를 이용한 배지 자동 생성
4. **다중 환경**: 여러 컴퓨터에서 안전하게 작업 가능

효율적인 사용을 위해 정기적인 동기화와 백업을 권장합니다.

---

*이 가이드는 BadgeGenerator 프로젝트에 맞춰 작성되었습니다.*
