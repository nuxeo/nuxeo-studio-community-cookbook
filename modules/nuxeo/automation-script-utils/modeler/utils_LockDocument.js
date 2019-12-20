/* Lock the input doc if it was not already locked (avoid a NuxeoException)

   input: document
   output: document

   Usage:
   input = javascript.utils_LockDocument(input, {});
*/
function run(input, params) {

  if(!input.isLocked()) {
    input = Document.Lock(input, {});
  }
  
  return input;
}