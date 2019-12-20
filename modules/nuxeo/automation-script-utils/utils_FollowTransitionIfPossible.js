/* FollowLifecycleTransition throws an error if the Document is in a state that does not allow
   following the transition. When bulk updating a list of documents, we may want to avoid that.

   input: document
   output: document

   Parameter:
     transition: String, the name of the transition to follow

   Usage:
   input = javascript.utils_FollowTransitionIfPossible(input, {"transition": "to_approved"});
*/
function run(input, params) {
  
  var transition, allowedTransitions;
    
  transition = params.transition;
  //Console.log("utils_FollowTransitionIfPossible: " + transition);
  
  if(typeof transition !== "string" || transition === "") {
    throw new org.nuxeo.ecm.core.api.NuxeoException("Missing the 'transition' parameter.");
  }
  
  allowedTransitions = input.doc.getAllowedStateTransitions();
  // This is a Java Collection<String>
  if(allowedTransitions.contains(transition)) {
    input = Document.FollowLifecycleTransition(input, {'value': transition});
  }
  else {
    Console.warn(input.title + " cannot follow the transition <" + transition + "> from state <" + input.lifeCycle + ">");
  }
  
  return input;
  
}
