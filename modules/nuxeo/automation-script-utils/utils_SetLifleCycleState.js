/* Used mainly when setting up some data (typically demo data).
   Setting the lifecycle directly does not trigger events, does not check the value is valid, etc.

   inpout: document
   output: document

   Parameter:
     newState: String, the name of the lifecycle state

   Usage:
   input = javascript.utils_SetLifleCycleState(input, {'newState': "Approved"});

   Pass the new state in the newState param.
   Make sure it is valid state for the lifecyclepolicy of the document.

*/
function run(input, params) {
  
  //Console.log("utils_SetLifleCycleState");
    
  if(typeof params.newState !== "string" || !params.newState) {
    throw new org.nuxeo.ecm.core.api.NuxeoException("utils_SetLifleCycleState: Missing parameter");
  }
  
  var doc = input.getDoc();
  // Using the Java API from the DocumentModel returned by input.getDoc()
  /* The Java code would be (with full qualified names)
      org.nuxeo.ecm.core.api.CoreSession cs = doc.getCoreSession();
      org.nuxeo.ecm.core.api.local.LocalSession ls = (org.nuxeo.ecm.core.api.local.LocalSession) cs;
      org.nuxeo.ecm.core.model.Session baseSession = ls.getSession();
      org.nuxeo.ecm.core.model.Document baseDoc = baseSession.getDocumentByUUID(doc.getId());
      baseDoc.setCurrentLifeCycleState("The-New-State");
  */
  var cs = doc.getCoreSession();
  var baseSession = cs.getSession();
  var baseDoc = baseSession.getDocumentByUUID(doc.getId());
  baseDoc.setCurrentLifeCycleState(params.newState);
  
  input.getDoc().refresh();
  return input;

}