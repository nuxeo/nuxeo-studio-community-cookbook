function run(input, params) {
  Console.log("*** START AS_AddCustomView ***");
  var custom_thumbnail, new_thumbnail, event, new_small_conversion;
  // Get the property storing the custom thumbnail
  custom_thumbnail = input["custom_view:thumbnail"];
  // We get the event which triggers the Automation scripting
  event = ctx.Event.getName();
  Console.log("Event: "+event);
  if (custom_thumbnail !== null){
    Console.log("A custom thumbnail is defined");
    // Create the parameters for the custom thumbnail conversion
    new_thumbnail = setThumbnailConversionParams(custom_thumbnail);
    Console.log("Custom thumbnail generated: "+custom_thumbnail.filename);
    // Save to false if on beforeDocumentModification. Used when the user manually upload a custom thumbnail
    if (event === "beforeDocumentModification"){
      // Works only on the initial upload. Any custom thumbnail update won't work. Set false as the document is in memeroy at that moment. Note: this is not possible to remove a blob and add a new one on such event unfortunately as it triggers a save operation. 
      if (input.hasFacet("Picture")){
        new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': false,
            'xpath': "picture:views/1/content"
          }
        );
      }
      if (input.hasFacet("File")){
        new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': false,
            'xpath': "thumb:thumbnail"
          }
        );
      }
       if (input.hasFacet("Video")){
        new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': false,
            'xpath': "picture:views/0/content"
          }
        );
         new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': false,
            'xpath': "picture:views/1/content"
          }
        );
      }
    }
    if (event === "pictureViewsGenerationDone"){
      // Save to true if on pictureViewsGenerationDone. Used when the main blob is updated but we want to keep the custom thumbnail
      if (input.hasFacet("Picture")){
        new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': true,
            'xpath': "picture:views/1/content"
          }
        );
      }
    }
    if (event === "scheduleThumbnailUpdate"){
      {
        new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': true,
            'xpath': "thumb:thumbnail"
          }
        );
      }
    }
    if (event === "videoConversionsDone"){
      {
        new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': true,
            'xpath': "picture:views/0/content"
          }
        );
        new_small_conversion = Blob.AttachOnDocument(
          new_thumbnail, {
            'document': input,
            'save': true,
            'xpath': "picture:views/1/content"
          }
        );
      }
      
    }
  }
  Console.log("*** END AS_AddCustomView ***");
}
function setThumbnailConversionParams(custom_thumbnail){
  var parameters_for_custom_thumbnail_conversion = "";
  parameters_for_custom_thumbnail_conversion += "width=" + "560" + "\n";
  parameters_for_custom_thumbnail_conversion += "height=" + "560" + "\n";
  parameters_for_custom_thumbnail_conversion += "targetFileName=" + custom_thumbnail.filename+"-resized.jpg" + "\n";
  var custom_thumbnail_resized = Blob.RunConverter(
    custom_thumbnail, {
      'converter': "convertToJpg",
      'parameters': parameters_for_custom_thumbnail_conversion
    }
  );
  return custom_thumbnail_resized;
}
