#####Code to send email from Gsheet on Extension>AppScript#####
function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters
  var result = 'Ok'; // assume success  if (!e || e.parameter === undefined)
  if (!e || e.parameter === undefined) {
    result = 'No Parameters';
  }
  else {
    var sheet_id = '1u3wX-XdNRbYvdKQKVlWsua74lSUJNK3gQWlGN2YcbA8'; 		
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();		// get Active sheet
    var newRow = sheet.getLastRow() + 1;						
    var rowData = [];
    d=new Date();
    rowData[0] = d; // Timestamp in column A
    rowData[1] = d.toLocaleTimeString(); // Timestamp in column A
    
    for (var param in e.parameter) {
      Logger.log('In for loop, param=' + param);
      var value = stripQuotes(e.parameter[param]);
      Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'value1': //Parameter 1, It has to be updated in Column in Sheets in the code, orderwise
          rowData[2] = value; //Value in column A
          result = 'Written on column A';
          break;
        case 'value2': //Parameter 2, It has to be updated in Column in Sheets in the code, orderwise
          rowData[3] = value; //Value in column B
          result += ' Written on column B';
          break;
        case 'value3': //Parameter 3, It has to be updated in Column in Sheets in the code, orderwise
          rowData[4] = value; //Value in column C
          result += ' Written on column C';
          break;
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));
    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }
  // Return result of operation
  return ContentService.createTextOutput(result);
}
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}

function checkAndSendAlert() {
  // Spreadsheet and sheet details
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange('C' + lastRow); // Assuming the values are in column C
  var value = range.getValue();

  // Threshold value
  var threshold = 300;

  // Recipient's email address
  var recipientEmail = 'selvalakshmi768@gmail.com';

  // Check if the value exceeds the threshold
  if (value > threshold) {
    // Send alert email
    sendAlertEmail(recipientEmail, "Value in cell C" + lastRow + " is greater than " + threshold + "Gas detected please check the area");
  }
}

function sendAlertEmail(recipientEmail, message) {
  // Subject of the email
  var subject = '!!!-Alert-!!!: Value Exceeded Threshold';

  // Body of the email
  var body = message;

  // Send the email
  MailApp.sendEmail('selvalakshmi768@gmail.com', subject,"Please check your area");

function createTimeDrivenTrigger() {
  // Delete existing triggers to avoid duplication
  var existingTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existingTriggers.length; i++) {
    if (existingTriggers[i].getHandlerFunction() == "checkAndSendAlert") {
      ScriptApp.deleteTrigger(existingTriggers[i]);
    }
  }

  // Create a new trigger to run checkAndSendAlert every minute
  ScriptApp.newTrigger('checkAndSendAlert')
      .timeBased()
      .everyMinutes(1)
      .create();
}}