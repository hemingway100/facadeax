/**
 * ═══════════════════════════════════════════
 * AI/AX 바이브코딩 교육 — 사전 설문 수집 스크립트
 * ═══════════════════════════════════════════
 * 
 * 📌 설정 방법:
 * 
 * 1. Google Sheets에서 새 시트를 만듭니다.
 *    - 시트 이름: "설문응답" (또는 아래 SHEET_NAME 변수와 동일하게)
 * 
 * 2. 첫 번째 행(헤더)에 아래 컬럼명을 넣어주세요:
 *    제출시간 | 이름 | 소속팀 | 담당업무 | AI사용빈도 | 사용AI도구 | AI활용용도 | 
 *    역량자가진단 | 코딩경험 | 바이브코딩인지 | 업무페인포인트 | 엑셀관리업무 | 
 *    데이터유형 | 배우고싶은것 | 만들고싶은것 | 걱정사항 | 사전준비도움
 * 
 * 3. [확장 프로그램] > [Apps Script] 클릭
 * 
 * 4. 이 코드를 전체 붙여넣기
 * 
 * 5. [배포] > [새 배포] > 유형: "웹 앱"
 *    - 실행 권한: "나"
 *    - 액세스 권한: "모든 사용자"
 *    - [배포] 클릭 → URL 복사
 * 
 * 6. 복사한 URL을 Vercel 환경변수에 설정:
 *    NEXT_PUBLIC_GOOGLE_SCRIPT_URL = 복사한_URL
 * 
 * ═══════════════════════════════════════════
 */

const SHEET_NAME = '설문응답';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Sheet not found: ' + SHEET_NAME 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    
    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.team || '',
      data.role || '',
      data.aiFrequency || '',
      data.aiTools || '',
      data.aiUsage || '',
      data.diagnostic || '',
      data.codingExperience || '',
      data.vibeAwareness || '',
      data.painPoints || '',
      data.excelWork || '',
      data.dataTypes || '',
      data.wantToLearn || '',
      data.wantToBuild || '',
      data.concerns || '',
      data.setupHelp || '',
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Response saved' 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'ok', 
    message: 'AI/AX 바이브코딩 교육 설문 API가 정상 동작 중입니다.' 
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 테스트용 — Apps Script 에디터에서 직접 실행해볼 수 있습니다.
 */
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: '테스트',
        team: '개발팀',
        role: '테스트 담당',
        aiFrequency: '거의 매일 사용',
        aiTools: 'ChatGPT, Claude',
        aiUsage: '문서 작성/교정',
        diagnostic: 'VS Code 사용: 들어봤지만 못함 | 터미널: 전혀 모름',
        codingExperience: 'AI 도구로 간단한 코드를 만들어본 적 있음',
        vibeAwareness: '들어는 봤지만 해본 적 없다',
        painPoints: '테스트 페인포인트',
        excelWork: '테스트 엑셀 업무',
        dataTypes: '고객/거래처 정보, 프로젝트 현황',
        wantToLearn: '바이브코딩의 기본 원리와 방법',
        wantToBuild: '팀 CRM',
        concerns: '',
        setupHelp: '',
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
