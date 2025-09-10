# 🏷️ 배지 생성기

Google Sheets와 연동하는 간단하고 빠른 배지 생성 시스템입니다.

## 🚀 사용법

1. **웹 서버 실행**

   ```bash
   python -m http.server 8000
   ```

2. **브라우저에서 접속**

   ```
   http://localhost:8000
   ```

3. **Google Sheets 설정**

   - Google Sheets ID 입력 (URL에서 /d/와 /edit 사이의 긴 문자열)
   - 데이터 범위 설정 (기본값: Sheet1!A:D)

4. **데이터 불러오기**

   - "연결 테스트" 클릭하여 연결 확인
   - "Google Sheets 불러오기" 클릭하여 데이터 로드

5. **배지 생성**
   - 각 행의 "배지 생성" 버튼 클릭

## 📊 Google Sheets 데이터 형식

| A열 (이름) | B열 (이메일)     | C열 (전화번호) | D열 (소속) |
| ---------- | ---------------- | -------------- | ---------- |
| 홍길동     | hong@example.com | 010-1234-5678  | ABC회사    |
| 김철수     | kim@example.com  | 010-9876-5432  | XYZ기관    |
| 이영희     | lee@example.com  | 010-5555-1234  | DEF그룹    |

## 🔧 Google Sheets 설정 방법

1. **시트 공유 설정**

   - Google Sheets에서 "공유" 버튼 클릭
   - "링크가 있는 모든 사용자"로 설정
   - "뷰어" 권한으로 설정

2. **시트 ID 찾기**
   - Google Sheets URL: `https://docs.google.com/spreadsheets/d/[시트ID]/edit`
   - [시트ID] 부분을 복사하여 입력

## ✨ 특징

- **Google Sheets 연동**: 실시간 데이터 동기화
- **단순함**: 복잡한 설정 없이 바로 사용
- **빠름**: 로컬에서 즉시 처리
- **안정적**: 여러 프록시 서비스 지원
- **직관적**: 쉬운 사용자 인터페이스

## 🛠️ 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript
- Google Sheets CSV Export
- Python HTTP Server

## 📁 파일 구조

```
BadgeGenerator/
├── index.html          # 메인 애플리케이션
├── README.md           # 사용 설명서
└── output/             # 생성된 배지 저장 폴더
```

## 🎯 향후 계획

- [ ] 배지 프린트 기능
- [ ] 다양한 배지 템플릿
- [ ] 배지 이미지 다운로드
- [ ] 데이터 내보내기/가져오기
- [ ] Google Sheets API 연동 (고급 기능)
