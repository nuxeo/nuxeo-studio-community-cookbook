/*
  Input type   : document
  Output type  : document

  Attaches on the document a blob from the templates available based on a templateID
*/
function run(input, params) {

  // Get the template ID
  var templateId = input["ftemp:templateID"]; // TO BE UPDATED !!!


  if (templateId !== null && templateId.length() > 0) {
    // Get the template to attach
    var query = "SELECT * FROM Document WHERE ecm:uuid = '" + templateId + "'";
    var resultQuery = Repository.Query(
      input, {
        'query': query
      }
    );

    // Attach the template blob
    for (var i = 0; i < resultQuery.length; i++) {
      var templateDoc = resultQuery[i];
      var templateBlob = templateDoc["file:content"];

      Blob.AttachOnDocument(
        templateBlob, {
          'document': input,
          'save' : true
        }
      );
     //Renaming the template blob, so it's not always the same and related to the document name
     var newName = input["dc:title"] + "-" + input["file:content"].filename;
     input = Document.SetBlobName(
       input,    {
          'name': newName,
          'save' : true
        }
     );
    }
  }
}
