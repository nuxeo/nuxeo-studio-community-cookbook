function run(input, params) {
  var serverURL = Env["nuxeo.url"];
  var file = "/nxfile/default/";
  var endpoint = "http://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=";
  var id = input.id;
  // Indicate in which property the blob you need to display is stored
  var file_property = "/file:content";
  var URL = endpoint + serverURL + file + id + file_property;
  URL = encodeURI(URL);
  Console.log("QR Code URL: "+URL);
  var resultBlob = HTTP.call("", "", "GET", URL);
  resultBlob = Blob.AttachOnDocument(
  resultBlob, {
    	'document': input,
    	'save': "true",
      'xpath': "file_schema:qrcode"
    }
  );
  // We need to update the mimetype
  input = Document.SetProperty(
    input, {
    	'xpath': "file_schema:qrcode/mime-type",
    	'save': "true",
    	'value': "image/png"
  }
  );
  return resultBlob;
}
