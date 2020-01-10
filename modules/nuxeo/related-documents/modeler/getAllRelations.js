/*
   input: document
   output: documents
*/
function run(input, params) {

  var PREDICATES = 'predicates';
  var INVERSE_PREDICATES = 'inverse_predicates';

  /**
  * Provide the  entries for the given predicates vocabulary
  * @param alias - User alias, e.g. Administrator
  * @param predicatesName - Possible values:   'predicates' or 'inverse_predicates'
  * @return Entries for the given vocabulary
  */
  function getPredicates(alias, predicatesName){

        var resultBlob, resultJson, resultStr;

      Auth.LoginAs(input, {'name': 'Administrator'});

      // Directory.Entries returns a `org.nuxeo.ecm.core.api.impl.blob.JSONBlob`
      // This means it is a _java_ object. That contains (in this context) a _string_.
      // So you must (1) Extract the string from the blob (2) Convert it to JSON.
      // Notice that toString() will not work here, it calls the generic function.
      // So, you must call `getString()` from the result, then `JSON.parse
      resultBlob = Directory.Entries(null, { "directoryName": predicatesName });

      Auth.Logout(input, {});

      // Get the content of the blob, as string
      resultStr = resultBlob.getString();

      // Parse it to get a JSON array
      resultJson = JSON.parse(resultStr);

      return resultJson;
  }

  function getRelatedDocuments(predicates,input){
    var i, j, k, predicate = null;
    var incoming = null;
    var incomings = [true, false];
    var numIncomings = incomings.length;
    var numPredicates = predicates === null? 0 : predicates.length;
    var allRelDocs = [];
    var relDocs = [];
    var docs = [];
    var relDoc = null;

    Console.info("# Incomings : '" + numIncomings + "'  # Predicates: '" + numPredicates +"'");

    for(i=0; i < numIncomings; i++){
      incoming = incomings[i];

      Console.info("incomings[" +i + "] : '" + incoming + "'");

      for (j = 0; j < numPredicates; j++) {
        predicate = predicates[j];

        // Operation Document.GetLinkedDocuments
        //
        // Get the relations for the input document.
        // The 'outgoing' parameter ca be used to specify whether outgoing
        // or incoming relations should be returned. Retuns a document list.
        docs = Document.GetLinkedDocuments(input,
                                                {
                                                  "predicate": predicate.id,
                                                  "outgoing": incoming
                                                }
                                               );

        if(docs !== null && docs.length > 0){

          relDocs = [];
          var numRelDocs = docs.length;

          Console.log(numRelDocs + " related docs FOUND for predicate (id): " + predicate.id );

          for(k=0; k<numRelDocs; k++){
            relDoc = {};
            relDoc.uid = docs[k].id;
            relDoc.title = docs[k].title;
            relDoc.path = docs[k].path;
            relDoc.lastModified = Fn.calendar(docs[k].getProperty('dc:modified')).format("yyyy-MM-dd'T'HH:mm:ssZ");

            relDoc.incoming = incoming;
            relDoc.relationId = predicate.id;
            relDoc.relationLabel = predicate.label;
            relDocs.push(relDoc);
          }

          allRelDocs = allRelDocs.concat(relDocs);
        }
        else{
          Console.log("NO related docs for predicate (id): " + predicate.id );
        }

      } //for i
    } //for j

    return allRelDocs;
  }

  //===================================
  // Main
  //===================================

  var user = User.Get(input, {});

  //DocumentModelImpl(Administrator, path=null, title=Administrator)
  Console.log("Alias: " + user.title);

  var predicates = getPredicates( user.title, PREDICATES);
  Console.log(predicates);
  Console.log(JSON.stringify(predicates) );
  var relDocuments = getRelatedDocuments(predicates,input);

  var numRelDocs = relDocuments === null? 0 : relDocuments.length;
  Console.log("# Related documents: " + numRelDocs);

  return relDocuments;
}
