/* input: void
   output: blob
  
   Parameters:
     - xpath: Field for which we want unique values
     - whereClause: the WHERE clause of the NXQL
   
   Example (also see virtual-tree.html):
       jsonArray = javascript.getUniqueValues(
         null, {
           "xpath": "company:country",
           "whereClause": "product:name = 'some_product'" AND company:country IS NOT NULL AND ecm:isVersion = 0 AND ecm:isTrashed = 0"
         })

   If your repository has a lot, a lot of documents found by the query, then another
   mechanism should be used. For example, if the field is linked to a vocabulary,
   load the vocabulary instead.
*/
function run(input, params) {
  
  var whereClause, xpath, resultSet, oneResult, nxql,
      currentPage, goOn, uniqueValues, i;
  
  Console.log("getUniqueValues...");
  
  // ========================================
  // Unique Values from a search
  // ========================================
  xpath = params.xpath;
  whereClause = params.whereClause;
  
  nxql = "SELECT " + xpath + " From Document WHERE " + whereClause;
  
  uniqueValues = [];
  currentPage = -1;
  do {
    currentPage += 1;
    
    resultSet = Repository.ResultSetQuery(
      null, {
        "query": nxql,
        "currentPageIndex": "" + currentPage,
        "pageSize": 10000
      });
    
    if(resultSet.size() > 0) {      
      for(i = 0; i < resultSet.size(); i++) {
        oneResult = resultSet.get(i)[xpath];
        if(uniqueValues.indexOf(oneResult) < 0) {
          uniqueValues.push(oneResult);
        }
      }
    }
    
    goOn = resultSet.size() > 0 && resultSet.getNumberOfPages() > (currentPage + 1);
    
  } while(goOn);
  
  return org.nuxeo.ecm.core.api.Blobs.createJSONBlob(JSON.stringify(uniqueValues));
  
}