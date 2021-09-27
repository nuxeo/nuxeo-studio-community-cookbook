/* * Receives a base64 encoded string params.base64string, returns a blob

   * If params.mime is passed, it is used to set the blob's mime type.
     else, the mimetype is calculated.
     ========================================================
     WARNING: Guessing the mimetype from blob:
         - Can fails if the blob is too big
         - Is costly in terms of CPU and memory usage
     => It is way better to pass the mimetype if you know it.
     ========================================================
     
   * If params.fileName is passed, it is used to set the blob's file name,
     else a generic name is set, trying to end with a valid file extension
     according to the mime type.
         - Is several file extensions are avilable, the first one is picked up
         - If no file extension is found, the file name has no file extension
   
   ===========================================
   IMPORTANT: Java in JS
   ===========================================
   To decode the string, we use Java and this requires to whitelist the
   the classes used here. Add this to an XML extension of your project:

<extension target="org.nuxeo.automation.scripting.internals.AutomationScriptingComponent"
           point="classFilter">
  <classFilter>
    <allow>java.util.Base64</allow>
    <allow>org.nuxeo.runtime.api.Framework</allow>
    <allow>org.nuxeo.ecm.platform.mimetype.interfaces.MimetypeRegistry</allow>
  </classFilter>
</extension>

    ===========================================
    Examples
    ===========================================
    var blob2 = javascript.utils_createBlobFromBase64(
                      null, {
                        mime: "image/png",
                        fileName: "some_image.jpg",
                        base64string: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAA....morebase64"
                      });
      
*/
function run(input, params) {
  
  var blob2 = javascript.utils_createBlobFromBase64(
    null, {
      mime: "image/png",
      fileName: "some_image.jpg",
      base64string: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAA....morebase64"
    });
  
  var blob, base64string, mimeType, fileName,
      mimeTypeService, decodedBytes, extensions;
  
  base64string = params.base64string;
  mimeType = params.mime;
  fileName = params.fileName;
  
  if(!base64string) {
    throw new org.nuxeo.ecm.core.api.NuxeoException("Missing the 'base64string' parameter.");
  }
  
  // Decode with Java
  decodedBytes = java.util.Base64.getDecoder().decode(base64string);
  blob = org.nuxeo.ecm.core.api.Blobs.createBlob(decodedBytes);
  
  if(!mimeType || !fileName) {
    mimeTypeService = org.nuxeo.runtime.api.Framework.getService(org.nuxeo.ecm.platform.mimetype.interfaces.MimetypeRegistry.class);

  }
    
  if(!mimeType) {
    // ****WARNING**** getMimetypeFromBlob() is costly. Better pass the mimetype.
    mimeType = mimeTypeService.getMimetypeFromBlob(blob);
  }
  blob.setMimeType(mimeType);
  
  if(!fileName) {
    fileName = "fromBase64-" + (new Date()).toISOString().substring(0, 10);
    extensions = mimeTypeService.getExtensionsFromMimetypeName(mimeType);
    if(extensions && extensions.size() > 0) {
      fileName += "." + extensions.get(0);
    }
  }
  blob.setFilename(fileName);
  
  return blob;

}