function run(input, params) {
  var serverURL = Env["nuxeo.url"];
  var file = "/nxfile/default/";
  var endpoint = "http://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=";
  var id = input.id;
  var URL = endpoint + serverURL + file + id;
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
