// CultureCompass survey → Google Sheet
// Paste this into Extensions → Apps Script of the results sheet, then Deploy → New deployment → Web app.

const SHEET_NAME = 'Responses';
const HEADERS = [
  'timestamp', 'version', 'consent', 'age', 'travel', 'vietnam', 'tasks',
  'r_easy', 'r_game_start', 'r_game_understand', 'r_learned', 'r_trust', 'r_look', 'r_enjoy',
  'more_countries', 'similar_used', 'similar_name', 'similar_compare', 'nps', 'feedback'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    const row = HEADERS.map(h => {
      if (h === 'timestamp') return new Date();
      let v = data[h] == null ? '' : String(data[h]).slice(0, 2000);
      // Stop typed answers from being read as spreadsheet formulas.
      if (/^[=+\-@]/.test(v)) v = "'" + v;
      return v;
    });
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Optional: open the URL in a browser to check the deployment works.
function doGet() {
  return ContentService.createTextOutput('CultureCompass survey endpoint is running.');
}
