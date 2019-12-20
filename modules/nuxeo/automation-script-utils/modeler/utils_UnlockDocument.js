/* Unlock the input doc if it was not already unlocked (avoid a NuxeoException)

   input: document
   output: document

   Usage:
   input = javascript.utils_UnlockDocument(input, {});
*/
function run(input, params) {

  if(input.isLocked()) {
    input = Document.Unlock(input, {});
  }
  
  return input;
}