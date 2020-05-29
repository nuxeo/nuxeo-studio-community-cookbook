function run(input, params) {
  Console.info("script eml_to_pdf_js:");
  Console.info("  input   : '" + input          + "' (" + typeof(input)          + ")");
  Console.info("  params  : '" + params         + "' (" + typeof(params)         + ")");
  Console.info("  ctx     : '" + ctx            + "' (" + typeof(ctx)            + ")");
  Console.info("    event : '" + ctx.Event      + "' (" + typeof(ctx.Event)      + ")");
  if (ctx.Event) {
  Console.info("      name: '" + ctx.Event.name + "' (" + typeof(ctx.Event.name) + ")");
  }

  var blob;
  var opts;
  var output = null;
  var result = input;

  blob = input["file:content"];
  Console.info("  blob    : '" + blob + "' (" + typeof(blob) + ")");

  opts = {
    "converter": "eml2pdf-eml-to-pdf"
  };

//opts.parameters = "inFilePath=" + blob.filename;

  try {
    Console.info("  Blob.RunConverter" + JSON.stringify(opts) + " : '" + blob + "'");
    output = Blob.RunConverter(blob, opts);
    Console.info("  Blob.RunConverter = '" + output + "'");
    Console.info("  output  : '" + output + "' (" + typeof(output) + ")");
  }
  catch(err) {
    Console.error("  Error in Blob.RunConverter: '" + err + "'");
  }

  if (output) {
    opts = {
      "document": input,
      "save": true,
      "xpath": "file_schema:pdfconversion"
    };
    try {
      Console.info("  Blob.AttachOnDocument" + JSON.stringify(opts) + " : '" + output + "'");
      result = Blob.AttachOnDocument(output, opts);
      Console.info("  Blob.AttachOnDocument = '" + result + "'");
      Console.info("  result  : '" + result + "' (" + typeof(result) + ")");
    }
    catch(err) {
      Console.error("  Error in Blob.AttachOnDocument: '" + err + "'");
    }
  }

  return result;

}
