function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var name = e.parameter.name || "";
  var radio = e.parameter.radio || "";
  var timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" });

  sheet.appendRow([timestamp, name, radio]);

  return ContentService.createTextOutput("OK");
}
