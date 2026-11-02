function doPost(e) {
  try {
    var body = JSON.parse((e.postData && e.postData.contents) || '{}');
    var props = PropertiesService.getScriptProperties();
    var apiKey = props.getProperty('FIREBASE_API_KEY');
    var dbUrl = props.getProperty('FIREBASE_DATABASE_URL');
    var sheetId = props.getProperty('SHEET_ID');
    if (!apiKey || !dbUrl || !sheetId || !body.idToken || !body.flightId) throw new Error('Missing setup or request fields');

    var identity = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + encodeURIComponent(apiKey), {
      method: 'post', contentType: 'application/json', payload: JSON.stringify({ idToken: body.idToken }), muteHttpExceptions: true
    });
    var identityData = JSON.parse(identity.getContentText());
    if (!identityData.users || !identityData.users.length) throw new Error('Invalid Firebase token');
    var uid = identityData.users[0].localId;
    var profile = readDb(dbUrl, '/users/' + encodeURIComponent(uid), body.idToken);
    var registration = readDb(dbUrl, '/flights/' + encodeURIComponent(body.flightId) + '/registrations/' + encodeURIComponent(uid), body.idToken);
    var flight = readDb(dbUrl, '/flights/' + encodeURIComponent(body.flightId), body.idToken);
    if (!profile || profile.examApproved !== true || profile.role === 'Training' || !registration || !flight) throw new Error('User is not eligible or flight registration is missing');

    var book = SpreadsheetApp.openById(sheetId);
    var sheet = book.getSheetByName('Registrations') || book.insertSheet('Registrations');
    if (sheet.getLastRow() === 0) sheet.appendRow(['Когда', 'UID', 'Имя', 'Должность', 'Рейс', 'Маршрут', 'Дата рейса']);
    sheet.appendRow([new Date(), uid, safeCell(profile.name), safeCell(profile.role), safeCell(flight.title), safeCell(flight.route), safeCell(flight.date)]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err.message || err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function readDb(base, path, token) {
  var url = base.replace(/\/$/, '') + path + '.json?auth=' + encodeURIComponent(token);
  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) throw new Error('Firebase rejected the sheet sync');
  return JSON.parse(response.getContentText());
}

function safeCell(value) {
  var text = String(value == null ? '' : value).slice(0, 300);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
