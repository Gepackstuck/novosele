// Google Apps Script: принимает анкеты со страницы и дописывает строки в таблицу.
// Вставьте этот код в Apps Script, привязанный к вашей Google Таблице (см. README.md).
var HEADERS = ['Время', 'Имя / погоняло', 'Придёт?', '+гостей', 'Принесёт', 'Любимый герой', 'Контакт', 'Пожелания'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sh.appendRow([new Date(), clean(p.name), clean(p.coming), clean(p.plus), clean(p.bring), clean(p.hero), clean(p.contact), clean(p.note)]);
  } finally { lock.releaseLock(); }
  return ContentService.createTextOutput('ok');
}

// защита от формул в ячейках и слишком длинного текста
function clean(v) {
  v = String(v || '').slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
