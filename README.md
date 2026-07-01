# AI/AX 실전 바이브코딩 교육 — 설문 & 타임테이블 사이트

## 배포 순서

### 1단계: 구글시트 + Apps Script 설정

1. **구글시트 생성**
   - [Google Sheets](https://sheets.google.com) → 새 스프레드시트
   - 시트 이름을 `설문응답`으로 변경
   - 1행에 아래 헤더 입력:

   ```
   제출시간 | 이름 | 소속팀 | 담당업무 | AI사용빈도 | 사용AI도구 | AI활용용도 | 역량자가진단 | 코딩경험 | 바이브코딩인지 | 업무페인포인트 | 엑셀관리업무 | 데이터유형 | 배우고싶은것 | 만들고싶은것 | 걱정사항 | 사전준비도움
   ```

2. **Apps Script 설정**
   - 시트에서 `확장 프로그램` → `Apps Script` 클릭
   - `google-apps-script.js` 파일의 내용을 전체 복사 → 붙여넣기
   - 저장 (Ctrl+S)

3. **웹 앱 배포**
   - `배포` → `새 배포` → 유형: `웹 앱`
   - 실행 권한: `나`
   - 액세스 권한: `모든 사용자`
   - `배포` 클릭 → **URL 복사** (이 URL이 webhook)

### 2단계: Vercel 배포

1. **GitHub에 프로젝트 push**
   ```bash
   cd survey-site
   git init
   git add .
   git commit -m "AI/AX 교육 설문 사이트"
   git remote add origin https://github.com/YOUR_USERNAME/ax-vibe-survey.git
   git push -u origin main
   ```

2. **Vercel에서 import**
   - [vercel.com](https://vercel.com) → New Project → GitHub 연결 → 이 저장소 선택

3. **환경변수 설정**
   - Vercel 프로젝트 Settings → Environment Variables
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` = 1단계에서 복사한 Apps Script URL
   - Redeploy

### 완료!

수강생에게 Vercel 배포 URL을 공유하면 됩니다.
설문 응답은 구글시트에 실시간으로 쌓입니다.
