function doPost(e) {
  var data = JSON.parse(e.postData.contents)
  var ss = SpreadsheetApp.getActiveSpreadsheet()

  if (data.type === 'franchise') {
    var sheet = ss.getSheetByName('Franchise Enquiries')
    if (!sheet) {
      sheet = ss.insertSheet('Franchise Enquiries')
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'City', 'Budget'])
    }
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.city || '',
      data.budget || '',
    ])
  } else {
    var sheet = ss.getSheetByName('Orders') || ss.getSheets()[0]
    var itemsText = Array.isArray(data.items)
      ? data.items.map(function (it) { return (it.qty || 1) + 'x ' + it.name }).join(', ')
      : (data.items || '')
    sheet.appendRow([
      new Date(),
      data.token || '',
      data.name || '',
      data.phone || '',
      itemsText,
      data.total || '',
      data.paymentMethod || '',
      data.status || '',
      data.counter || '',
    ])
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON)
}
