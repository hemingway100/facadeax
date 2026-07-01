/**
 * 파사드패턴 AI/AX 교육 — 사전 설문 수집 스크립트
 *
 * 설정: 구글시트 > 확장 프로그램 > Apps Script > 이 코드 붙여넣기
 * 배포: 배포 > 새 배포 > 웹 앱 > 액세스: 모든 사용자 > URL 복사
 * Vercel 환경변수: NEXT_PUBLIC_GOOGLE_SCRIPT_URL = 복사한 URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
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
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error', message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok', message: '설문 API 정상 동작 중'
  })).setMimeType(ContentService.MimeType.JSON);
}
