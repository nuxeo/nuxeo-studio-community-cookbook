// This filter is applied to any query.
var genericFilter = " ecm:mixinType != 'HiddenInNavigation' AND ecm:isCheckedInVersion = 0 AND ecm:isTrashed = 0 ";
// Turn log messages on or off globally.
var loggingEnabled = true;

function run(input, params) {

  var domainDoc = getDocFromQuery("Domain");

  if (domainDoc) {

    // Get folder named "Metrics"
    var metricsFolderName = "Metrics";
    var metricsFolder = getDocFromQuery("Folder", "dc:title = '" + metricsFolderName + "'");

    // If it doesn't exist, create it
    if (metricsFolder === null) {
      metricsFolder = Document.Create(
        domainDoc, {
          'type': 'Folder',
          'name': metricsFolderName,
          'properties': {
            'dc:title': metricsFolderName
          }
        }
      );
    }

    javascript.trk_GenerateData_Docs(
      metricsFolder, {}
    );

  } else {

    // Display an error.
    var message = "You must create a Domain first.";
    Console.error(message);
    return message;

  }

  Console.warn("trk_GenerateData complete.");
}


function getDocFromQuery(typeName, clauses) {
  if (!typeName)
    typeName = "Document";
  var query = "SELECT * FROM " + typeName + " WHERE ";
  if (clauses)
    query = query + clauses + " AND ";
  query = query + genericFilter;
  var results = Repository.Query(
    null, {
      'query': query
    }
  );
  var resultDoc = (results.length > 0) ? results[0] : null;
  return resultDoc;
}

//= Helpers ==================================================================
function logHelper(message) {
  if (loggingEnabled)
    Console.warn(message);
}
