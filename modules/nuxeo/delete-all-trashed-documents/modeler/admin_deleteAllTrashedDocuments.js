/* Deletes all trashed documents.
   requires Nuxeo 10.10 (LTS2019) or greater.
*/
function run(input, params) {
  
  var docs, count;
  
  Console.log("Deleting all trashed documents...");
  
  do {
    
    docs = Repository.Query(null, {"query": "SELECT * FROM Document WHERE ecm:isTrashed = 1"});
    count = docs.length;
    if(count > 0) {
      Console.log("  Deleting " + count + " documents and commiting the transaction...");
      Document.Delete(docs, {});
      org.nuxeo.runtime.transaction.TransactionHelper.commitOrRollbackTransaction();
      org.nuxeo.runtime.transaction.TransactionHelper.startTransaction();
    }
    
  } while(count > 0);
  Console.log("Deleting all trashed documents.......DONE");

}