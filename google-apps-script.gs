const SHEET_NAME = 'storage';
const DEFAULT_KEYS = ['qaEmployees', 'qaVacation_v2', 'qaLeave'];

function doGet(e) {
  const data = readStorage_();
  const payload = JSON.stringify({ ok: true, data: data });
  const callback = e && e.parameter && e.parameter.callback;

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + payload + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
  const payload = JSON.parse(body);

  if (!payload.data || typeof payload.data !== 'object') {
    throw new Error('Missing data payload');
  }

  writeStorage_(payload.data);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function readStorage_() {
  const sheet = getStorageSheet_();
  const values = sheet.getDataRange().getValues();
  const data = {};

  for (let i = 1; i < values.length; i++) {
    const key = values[i][0];
    if (key) data[key] = values[i][1] || '';
  }

  DEFAULT_KEYS.forEach(function(key) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) data[key] = '';
  });

  return data;
}

function writeStorage_(data) {
  const sheet = getStorageSheet_();
  const now = new Date();
  const rows = [['key', 'value', 'updatedAt']];

  DEFAULT_KEYS.forEach(function(key) {
    rows.push([key, data[key] || '', now]);
  });

  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sheet.autoResizeColumns(1, 3);
}

function getStorageSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 3).setValues([['key', 'value', 'updatedAt']]);
    DEFAULT_KEYS.forEach(function(key, idx) {
      sheet.getRange(idx + 2, 1, 1, 3).setValues([[key, '', '']]);
    });
  }

  return sheet;
}
