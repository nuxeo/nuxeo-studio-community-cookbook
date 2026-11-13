/*
  AS_RenderTemplateWithAttachedImages

  Renders the input document with a Word (.docx) template of the Template Rendering add-on, with ALL the
  images attached to the document (listXpath parameter), whatever their number. Caption of each image = its file name.
  Module template-rendering-with-images of the Nuxeo Studio Community Cookbook: see its README.

  ==========> See at the end of the script for examples of using images from nxql <==========

  Input type : document
  Output type: blob (the rendered file: .docx, or .pdf)

  Parameters
    listXpath     string, required. XPath of the list of blobs holding the images (field type "Blob multivalued")
    templateName  string, required.  tmpl:templateName of the Template document (the Word template)
    maxImages     integer, optional. Maximum number of images rendered. Default: 20
    convertToPdf  boolean, optional. Converts the result to PDF, unless it already is a PDF (template whose
                  output format is PDF). Default: false

  Only attachments whose file name ends with .jpg, .jpeg, .png, .gif or .bmp are rendered (case-insensitive).
  The others (TIFF, SVG, PDF, no file name, ...) are skipped.

  WARNING: every call SAVES the input document (template binding + parameters): dc:modified changes, an audit
  entry is created, automatic versioning may apply and "Document modified" handlers run. So:
    - NEVER call this script from a aboutToCreate, beforeModificaiton of documentModified
    - the current user needs the Write permission on the document,
    - the first call binds the document to the template (adds the TemplateBased facet).

  Usage, from another script:
    var blob = javascript.AS_RenderTemplateWithAttachedImages(input, {
      "listXpath": "myschema:images",
      "templateName": "images-with-captions",
      "convertToPdf": true
    });

*/
var DEFAULT_MAX_IMAGES = 20;

function run(input, params) {
  var maxImages, items, i, blob, filename, images = [], skipped = [], tooMany = 0,
      listXpath;

  listXpath = params.listXpath;

  checkInput(input);
  maxImages = toPositiveInt(params.maxImages, DEFAULT_MAX_IMAGES);

  items = input[listXpath];
  if (items === null || items === undefined) {
    throw "Document " + input.getId() + " (" + input.getType() + ") has no " + listXpath + " field";
  }

  for (i = 0; i < items.length; i++) {
    blob = items[i];
    filename = blob ? blob.getFilename() : null;
    if (!isSupportedImage(filename)) {
      skipped.push(filename ? String(filename) : "#" + i + (blob ? " (no file name)" : " (no file)"));
    } else if (images.length >= maxImages) {
      tooMany++;
    } else {
      // The index is the index in the FULL list, not in the list of images
      images.push({ xpath: listXpath + "/" + i, caption: String(filename) });
    }
  }
  if (skipped.length > 0) {
    Console.warn("AS_RenderTemplateWithAttachedImages, document " + input.getId() + ": " + skipped.length
        + " file(s) skipped (not jpg/jpeg/png/gif/bmp): " + skipped.join(", "));
  }
  if (tooMany > 0) {
    Console.warn("AS_RenderTemplateWithAttachedImages, document " + input.getId() + ": " + tooMany
        + " image(s) not rendered (maxImages = " + maxImages + ")");
  }

  // Out of range index => blank image, used only when there is no image at all
  return renderWithImages(input, params.templateName, images,
      listXpath + "/" + items.length, params.convertToPdf);
}

/* ==================== Common code (same in both scripts of the module) ==================== */

var SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "bmp"];
// Template parameters set by this script. Parameters of the template with the same names are replaced.
var OWN_PARAMS = ["images", "captions", "img"];
// Maximum length of the parameters XML (schema of the template binding)
var MAX_TEMPLATE_DATA_LENGTH = 65536;

// The rendering saves the document: not possible on a version or a proxy
function checkInput(input) {
  if (input.isVersion() || input.isProxy()) {
    throw "Cannot render a version or a proxy: the rendering saves the document";
  }
}

function toPositiveInt(value, defaultValue) {
  var n = parseInt(value, 10);
  return isNaN(n) || n < 1 ? defaultValue : n;
}

function isTrue(value) {
  return value === true || String(value) === "true";
}

// The add-on takes the image format from the file name extension: no file name => error, unknown extension
// => broken image. TIFF and SVG are excluded: their size cannot be read to fit them in the placeholder.
function isSupportedImage(filename) {
  var dot;
  if (!filename) {
    return false;
  }
  filename = String(filename);
  dot = filename.lastIndexOf(".");
  return dot > -1 && SUPPORTED_EXTENSIONS.indexOf(filename.substring(dot + 1).toLowerCase()) > -1;
}

function xmlEscape(value) {
  return String(value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function nxqlString(value) {
  return "'" + String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n") + "'";
}

/*
  Returns the Template document used to render input with templateName:
  - document already bound to this template name: the add-on renders with the bound template (by id), use it;
  - not bound yet: search it by name, like the add-on, but without trashed documents and versions.
*/
function findTemplate(input, templateName) {
  var bindings, i, docs;

  bindings = input["nxts:bindings"];
  if (bindings) {
    for (i = 0; i < bindings.length; i++) {
      if (String(bindings[i].templateName) === templateName) {
        try {
          return Repository.GetDocument(null, { "value": String(bindings[i].templateId) });
        } catch (e) {
          throw "The document is bound to a template named '" + templateName + "' that cannot be read (deleted, or no Read permission)";
        }
      }
    }
  }

  docs = Repository.Query(null, {
    "query": "SELECT * FROM Document WHERE ecm:mixinType = 'Template' AND tmpl:templateName = " + nxqlString(templateName) + " AND ecm:isTrashed = 0 AND ecm:isVersion = 0 AND ecm:isProxy = 0"
  });
  if (docs.length === 0) {
    throw "No template named '" + templateName + "' (or no Read permission on it)";
  }
  if (docs.length > 1) {
    throw "Several templates are named '" + templateName + "': template names must be unique";
  }
  return docs[0];
}

// Returns the top-level <nxdt:field> elements of a <nxdt:templateParams> XML, as strings
function topLevelFields(xml) {
  var fields = [], depth = 0, start = -1, match;
  var tagRegex = /<(\/?)nxdt:field\b(?:[^>"']|"[^"]*"|'[^']*')*?(\/?)>/g;

  if (!xml) {
    return fields;
  }
  xml = String(xml);
  while ((match = tagRegex.exec(xml)) !== null) {
    if (match[1] === "/") {
      depth--;
      if (depth === 0) {
        fields.push(xml.substring(start, tagRegex.lastIndex));
      }
    } else if (match[2] === "/") {
      if (depth === 0) {
        fields.push(match[0]);
      }
    } else {
      if (depth === 0) {
        start = match.index;
      }
      depth++;
    }
  }
  return fields;
}

// Returns the value of the "name" attribute of a <nxdt:field> element
function fieldName(fieldXml) {
  var startTag = fieldXml.match(/^<nxdt:field\b(?:[^>"']|"[^"]*"|'[^']*')*?\/?>/)[0];
  var attrRegex = /\s([\w:.\-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, match;

  while ((match = attrRegex.exec(startTag)) !== null) {
    if (match[1] === "name") {
      return match[2] || match[3] || "";
    }
  }
  return "";
}

/*
  Builds the parameters XML: the template's own parameters (except OWN_PARAMS), then
  - "images", a List of picture params (one per image),
  - "captions", a List of String params (same order),
  - "img", a picture param that only declares the bookmark "img" as an image (the loop variable hides it).
*/
function buildTemplateData(templateXml, images, imgSource) {
  var fields = topLevelFields(templateXml), xml, i;

  xml = '<nxdt:templateParams xmlns:nxdt="http://www.nuxeo.org/DocumentTemplate">';
  for (i = 0; i < fields.length; i++) {
    if (OWN_PARAMS.indexOf(fieldName(fields[i])) === -1) {
      xml += fields[i];
    }
  }
  xml += '<nxdt:field name="images" type="List">';
  for (i = 0; i < images.length; i++) {
    xml += '<nxdt:field name="img' + i + '" type="picture" source="' + xmlEscape(images[i].xpath) + '"/>';
  }
  xml += '</nxdt:field><nxdt:field name="captions" type="List">';
  for (i = 0; i < images.length; i++) {
    xml += '<nxdt:field name="caption' + i + '" type="String" value="' + xmlEscape(images[i].caption) + '"/>';
  }
  xml += '</nxdt:field>';
  xml += '<nxdt:field name="img" type="picture" source="' + xmlEscape(imgSource) + '"/>';
  return xml + '</nxdt:templateParams>';
}

// images: array of {xpath, caption}. emptyImgSource: xpath used for "img" when there is no image.
function renderWithImages(input, templateName, images, emptyImgSource, convertToPdf) {
  var template, templateData, blob;

  if (!templateName) {
    throw "The templateName parameter is required";
  }
  templateName = String(templateName);
  template = findTemplate(input, templateName);
  if (isTrue(template["tmpl:useAsMainContent"])) {
    throw "The template '" + templateName + "' is used as main content: not supported (the add-on would" + " replace the main file of the document)";
  }

  templateData = buildTemplateData(template["tmpl:templateData"], images,
      images.length > 0 ? images[0].xpath : emptyImgSource);
  if (templateData.length > MAX_TEMPLATE_DATA_LENGTH) {
    throw "Too many images or parameters for one rendering: lower maxImages";
  }

  // SAVES the document: binds it to the template on the first call, then replaces all its parameters
  blob = TemplateProcessor.Render(input, {
    "templateName": templateName,
    "attach": true,
    "templateData": templateData
  });
  if (!blob) {
    throw "The rendering with the template '" + templateName + "' returned nothing";
  }
  if (isTrue(convertToPdf) && String(blob.getMimeType()) !== "application/pdf") {
    blob = Blob.RunConverter(blob, { "converter": "any2pdf" });
  }
  return blob;
}

/* ==================================================
   USING IMAGES FROM NXQL - EXAMPLE
   ==================================================
  
   IMPORTANT: In all cases, you need a blob list field, since Template rendering expects the data to live
              in the current document. In this example, we use a fortemplate:images blob list field.
*/
/*
function run(input, params) {
  
  var docs, nxql, images, rendered;

  // In this example, we search for Picture related to the current document and display their "Medium" rendition.
  nxql = "SELECT *  FROM Document WHERE ecm:mixinType = 'Picture' AND ..."; // <== do whatever is relevant to your use case
  nxql += " AND ecm:isVersion = 0 AND ecm:isProxy = 0 AND ecm:isTrashed = 0"
  nxql += " ORDER BY ...";
  docs = Repository.Query(null, {"query": nxql});
  images = [];
  for (var i = 0; i < docs.length; i++) {
    var medium = Picture.GetView(docs[i], "Medium");
    if(medium) {
      images.push(medium);
    }
  }

  input["fortemplate:images"] = images;

  rendered = javascript.AS_RenderTemplateWithAttachedImages(
    input, {
      "listXpath": "fortemplate:images",
      "templateName": "YourTemplateName"
    }
  );

  // The document was saved with the parameters. If you don't want the blobs to remain attached,
  // you can remove them here. Of course, this will lead to another audit entry.
  //     - Refresh the document (it was modified)
  input = Repository.GetDocument(null, { "value": input.id});
  //     - Reset the images field
  input["fortemplate:images"] = null;
  input = Document.Save(input, {});

  return rendered;
}
*/