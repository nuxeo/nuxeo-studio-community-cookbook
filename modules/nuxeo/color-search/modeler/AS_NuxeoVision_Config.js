// =====================================================================
// Add blob to document
// xpath: file:content or files:files or ?
// single: boolean if xpath is a single blob property or a list
// name: blob name
function addDocumentBlob(doc, blob, xpath, single, name) {
  Console.info("  function addDocumentBlob:");
  Console.info("    doc   : '" + doc + "'");
  Console.info("    blob  : '" + blob + "'");
  Console.info("    xpath : '" + xpath + "'");
  Console.info("    single: '" + single + "'");
  Console.info("    name  : '" + name + "'");
  var params = {
    'document': doc,
    'save': false,
    'xpath': xpath
  };
  var res;
  var size;
  try {
    Console.info("    params: '" + JSON.stringify(params) + "'");
    res = Blob.AttachOnDocument(blob, params);
    Console.info("    Blob.AttachOnDocument: '" + res + "'");
  }
  catch(err) {
    Console.error("    Error in Blob.AttachOnDocument: '" + err + "'");
  }
  if (res) {
    if (single === false) {
      // Append to blob xpath list
      size = doc[xpath].length;
      Console.info("    xpath.length: '" + size + "'");
      xpath += "/" + (size-1) + "/file";
    }
    // Rename blob
    params = {
      'name': name,
      'save': false,
      'xpath': xpath
    };
    try {
      Console.info("    xpath : '" + xpath + "'");
      Console.info("    params: '" + JSON.stringify(params) + "'");
      res = Document.SetBlobName(doc, params);
      Console.info("    Document.SetBlobName: '" + res + "'");
    }
    catch(err) {
      Console.error("    Error in Document.SetBlobName: '" + err + "'");
    }
  }
  return res;
}
// =====================================================================
function attachTextBlob(doc, xpath, single, name, string) {
  Console.info("  function attachTextBlob:");
  Console.info("    doc   : '" + doc + "'");
  Console.info("    xpath : '" + xpath + "'");
  Console.info("    single: '" + single + "'");
  Console.info("    name  : '" + name + "'");
  Console.info("    strlen: '" + string.length + "'");
  var blob;
  ctx.textBlobString = string;
  try {
    blob = Context.RestoreBlobInputFromScript(null, {
      script: 'This=new org.nuxeo.ecm.core.api.impl.blob.StringBlob(textBlobString, "text/plain");'
    }
                                             );
    Console.info("    blob  : '" + blob + "'");
  }
  catch(err) {
    Console.error("  Error in Context.RestoreBlobInputFromScript: '" + err + "'");
  }
  if (blob) {
    addDocumentBlob(doc, blob, xpath, single, name);
  }
  return blob;
}
// =====================================================================
var colorToCss = function(color) {
  return rgbToCssColor_(color.red, color.green, color.blue);
};
var rgbToCssColor_ = function(red, green, blue) {
  var rgbNumber = new Number((red << 16) | (green << 8) | blue);
  var hexString = rgbNumber.toString(16);
  var missingZeros = 6 - hexString.length;
  var resultBuilder = ['#'];
  for (var i = 0; i < missingZeros; i++) {
    resultBuilder.push('0');
  }
  resultBuilder.push(hexString);
  return resultBuilder.join('');
};
// =====================================================================
// Get document blob
function getBlob(doc) {
  Console.info("function getBlob: '" + doc + "'");
  var blob = doc["file:content"];
  Console.info("  blob 1: '" + blob + "'");
  if (blob.getLength() > 4194304) {
    Console.info("  GetView 'Medium'");
    blob = Picture.GetView(doc, {
      'viewName': 'Medium'}
                          );
    Console.info("  blob 2: '" + blob + "'");
  }
  if (blob.getLength() > 4194304) {
    Console.info("  GetView 'Small'");
    blob = Picture.GetView(doc, {
      'viewName': 'Small'}
                          );
    Console.info("  blob 3: '" + blob + "' (" + blob.getLength() + ")");
  }
  return blob;
}
// =====================================================================
// Get image colors
function getImageColors(doc, imageProps) {
  Console.info("function getImageColors:");
  var r,g,b;
  var color;
  var colors = [];
  var colorInfo;
  var colorInfos = imageProps.getColors();
  var i;
  Console.info("  colorInfos: '" + colorInfos + "'");
  if (colorInfos && colorInfos.length) {
    for (i = 0; i < colorInfos.length; i++) {
      colorInfo = colorInfos[i];
      Console.info("  colorInfos[" + i + "]: '" + colorInfo + "'");
      color = {
      };
      color.blue  = colorInfo.color.blue;
      color.green = colorInfo.color.green;
      color.red   = colorInfo.color.red;
      b = Number(color.blue);
      g = Number(color.green);
      r = Number(color.red);
      color.css   = colorToCss(colorInfo.color);
      color.pixelFraction = colorInfo.pixelFraction;
      color.score = Math.floor(colorInfo.score * 100);
      // https://css-tricks.com/converting-color-spaces-in-javascript/#rgb-to-hsl
      // Make r, g, and b fractions of 1
      r /= 255;
      g /= 255;
      b /= 255;
      // Find greatest and smallest channel values
      var cmin = Math.min(r,g,b);
      var cmax = Math.max(r,g,b);
      var delta = cmax - cmin;
      var h = 0;
      var s = 0;
      var l = 0;
      // Calculate hue
      // No difference
      if (delta === 0)
        h = 0;
      // Red is max
      else if (cmax == r)
        h = ((g - b) / delta) % 6;
      // Green is max
      else if (cmax == g)
        h = (b - r) / delta + 2;
      // Blue is max
      else
      h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      // Make negative hues positive behind 360°
      if (h < 0)
        h += 360;
      // Calculate lightness
      l = (cmax + cmin) / 2;
      // Calculate saturation
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      // Multiply l and s by 100
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);
      color.hsl_h=h;
      color.hsl_s=s;
      color.hsl_l=l;
      colors.push(color);
    }
    doc["color_extraction:colors"] = colors;
  }
  return colors;
}
function getVisionImageProps(visionResponse) {
  Console.info("function getVisionImageProps:");
  var imageProps = visionResponse.getImageProperties();
  Console.log("imageProps: "+imageProps);
  return imageProps;
}
// =====================================================================
function getVisionObject(doc, visionResponse) {
  Console.info("function getVisionObject:");
  var visionObject = visionResponse.getNativeObject();
  Console.info("  typeof(visionObject): '" + typeof(visionObject) + "'");
  return visionObject;
}
// =====================================================================
// Get VisionResponse
function getVisionResponses(blob) {
  Console.info("function getVisionResponses:");
  Console.info("  blob 1: '" + blob + "'");
  var features = [];
  features.push('IMAGE_PROPERTIES');
  var result = VisionOp(blob,
                        {
                          'features': features,
                          'maxResults': 50,
                          'outputVariable': 'visionResponses'
                        }
                       );
  Console.info("  result: '" + result + "'");
  var visionResponses = ctx.visionResponses;
  Console.info("  visionResponses: '" + visionResponses + "'");
  return visionResponses;
}
function main(doc) {
  Console.info("function main: '" + doc + "'");
  var blob = getBlob(doc);
  var i;
  var imageColors;
  var imageProps;
  var result;
  var visionLabels;
  var visionObject;
  var visionObjects = [];
  var visionResponse;
  var visionResponses = getVisionResponses(blob);
  var visionSafe;
  var visionText;
  if (visionResponses && visionResponses.length) {
    Console.info("  visionResponses.length: '" + visionResponses.length + "'");
    try {
      result = Document.AddFacet(doc, {
        "facet": "ColorFacet",
        "save": false
      }
                                );
      Console.info("  AddFacet result: '" + result + "'");
    }
    catch(err) {
      Console.error("  Error in Document.AddFacet: '" + err + "'");
      return doc;
    }
    for (i = 0; i < visionResponses.length; i++) {
      visionResponse = visionResponses[i];
      Console.info("  visionResponses[" + i + "]: '" + visionResponse + "'");
      visionObject = getVisionObject(doc, visionResponse);
      visionObjects.push(visionObject.toString());
      try {
        imageProps = getVisionImageProps(visionResponse);
        Console.info("  imageProps: '" + imageProps + "'");
      }
      catch(err) {
        Console.error("  Error in getVisionImageProps: '" + err + "'");
      }
      if (imageProps) {
        try {
          imageColors = getImageColors(doc, imageProps);
          Console.info("  imageColors: '" + imageColors + "'");
        }
        catch(err) {
          Console.error("  Error in getImageColors: '" + err + "'");
        }
      }
      //doc["vision:complete"] = true;
      try {
        result = Document.Save(doc, {
        }
                              );
        Console.info("  result: '" + result + "'");
      }
      catch(err) {
        Console.error("  Error in Document.Save: '" + err + "'");
      }
    }
  }
  return doc;
}
// =====================================================================
function run(input, params) {
  var result;
  try {
    result = main(input);
  }
  catch(err) {
    Console.error("Error in main: '" + err + "'");
  }
  return result;
}
