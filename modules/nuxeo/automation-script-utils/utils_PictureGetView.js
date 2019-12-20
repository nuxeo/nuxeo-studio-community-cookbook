/* Receives a document, set ctx.pictureView Context Variable
   to the PictureView object, whose title is passed in the viewName
   parameter (null if not found).
   if parameter not passed, use "FullHD".
   Return the input document unchanged
   
   input: document
   output:document
   
   Parameter
     vieName: String, the title of the view to use
   
   NOTICE: The Picture.GetView operation returns a blob,
           here, we return the view (with dimensions etc.)
   
   Usage
   input = javascript.utils_PictureGetView(input, {"viewName": "Thumbnail"});
   var view = ctx.pictureView;
   if(view) {
     // ... access to view.width, view.info.colorSpace, view.content.filename, ...
   }
*/
function run(input, params) {

  var views, viewName, i;
  
  ctx.pictureView = null;

  viewName = params.viewName;
  if(!viewName) {
    viewName = "FullHD";
  }
  
  views = input["picture:views"];
  if(!views || !views.length) {
    return input;
  }
  
  for(i = 0; i < views.length; i++) {
    if(views[i].title === viewName) {
      ctx.pictureView = views[i];
      return input;
    }
  }
  
  return input;
}

