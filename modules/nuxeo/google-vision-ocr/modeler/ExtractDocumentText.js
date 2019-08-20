function run(input, params) {
  // If called by workflow...
  if (input.length) {
    for (var i = 0; i < input.length; i++) {
      extractText(input[i]);
    }
  } else {
    extractText(input);
  }
  return input;
}

function extractText(input) {
  Log(input, {
    'level': "warn",
    'message': "Performing extract: " + input
  });
  var file = input["file:content"];
  if (file) {
    // TODO: Check if this is a PDF
    var pages = PDF.ConvertToPictures(input, {});
    var allData = "";

    for (var pg = 0; pg < pages.length; pg++) {
      var page = pages.get(pg);
      VisionOp(
        page, {
          'features': 'DOCUMENT_TEXT_DETECTION',
          'maxResults': 1,
          'outputVariable': 'vision'
        }
      );
      if (ctx.vision) {
        Log(input, {
          'level': "warn",
          'message': "Vision output: " + ctx.vision
        });

        var responses = ctx.vision.iterator();
        var ocr = "";
        while (responses.hasNext()) {
          var response = responses.next();
          var texts = response.getOcrText();
          if (texts) {
            var iter = texts.iterator();
            if (iter.hasNext()) {
              var text = iter.next();
              ocr = text.getText();
            }
          }
        }
        Log(input, {
          'level': "warn",
          'message': "OCR Page [" + pg + "]:\n'" + ocr + "'"
        });
        allData += ocr;
      } else {
        Log(input, {
          'level': "warn",
          'message': "No vision output for page: " + pg
        });
      }
    }

    Document.AddFacet(
      input, {
        'facet': 'OCR',
        'save': false
      }
    );
    Document.SetProperty(
      input, {
        'xpath': 'ocr:processed',
        'save': false,
        'value': 'true'
      }
    );
    Document.SetProperty(
      input, {
        'xpath': 'ocr:data',
        'save': true,
        'value': allData
      }
    );
  } else {
    return null;
  }
}
