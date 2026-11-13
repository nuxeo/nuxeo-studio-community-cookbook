# Template Rendering: a Variable Number of Images in a Word Template

Javascript automation to display a variable number of images in a Word template.

## TL;DR

* Using Nuxeo template rendering and a Word template, render a variable number of images (by default, you can render only a fixed number)
* How-to:
  * Copy the [AS_RenderTemplateWithAttachedImages.js](modeler/AS_RenderTemplateWithAttachedImages.js) and tune it if needed
  * Copy the example Word template, adapt it to your needs, create the File Template in Nuxeo.
  * Call the script (with the correct parameters) to render the document with a list of images, where sometimes there are 2, sometimes there are 20.

## Introduction

With the Nuxeo Template Rendering add-on and a Word (.docx) template, images go in pre-defined spots: one `picture`
template parameter = one bookmarked placeholder picture in Word = one image (one blob). So a template cannot show "all
the images of the document" when their number varies from one document to another.

This receipe of the cookbook adds:

* An **Automation Script** that lists the images of the document and passes the list to the rendering, as template
  parameters.
* A **Word template** example, where a FreeMarker loop repeats one placeholder picture (and its caption) for each image.
* Each image is fitted in the placeholder box, keeping its proportions.

> [!IMPORTANT]
> The Template Rendering add-on only reads the images of the rendered (input) document. To render images from elsewhere
> (documents found by an NXQL query, blobs built by another script, ...), build the list of blobs yourself and put it in
> a custom field of the input document, before calling the script.

An almost ready-to-use script is provided. "Almost" because you will tune it:

* Change the xpath of the list of images
* By default the caption is the file name, you may want to adapt this
* Maybe you need to create the blob list from a NXQL etc.

> [!WARNING]
> Every rendering **saves the document** (see [Issues and Limitations](#issues-and-limitations)). In short: the user
> needs the Write permission, or the script executed afte a call to `Auth.Login`. Also, do not call if in `aboutToCreate`,
> `beforeModification` (and `documentModified` to avoid inifinte loop)

## Prerequisites

* The Template Rendering add-on (package `nuxeo-template-rendering`)

## Installation and Usage

### Installation

* In Studio Modeler, create an automation script and paste the content of [modeler/AS_RenderTemplateWithAttachedImages.js](modeler/AS_RenderTemplateWithAttachedImages.js)
  * Input: `document`, Output: `blob`
  * Parameters:

  > [!IMPORTANT]
  > Think about explicitely declaring them in the "Parameters" tab

  | Name | Type | Default | Description |
  |---|---|---|---|
  | `listXpath` | String | (required) | The xpath of the field holdoing a blob list |
  | `templateName` | String | (required) | Template name of the Word template |
  | `maxImages` | Integer | `20` | Maximum number of images rendered |
  | `convertToPdf` | Boolean | `false` | Converts the result to PDF, unless it already is a PDF |

* Update it/Tune it as needed:
  * Get the images dynamically, from a NXQL search foe example (see examples below)
  * Change the caption (filename in the script)
  * Maybe your field is not a blob list but a complex multivalued with a blob field to use
  * . . .

* You can then use it from wherever you need

From another Automation Script:

```js
// Attached images, converted to PDF
// (Assuming you kept the AS_RenderTemplateWithAttachedImages ID)
var blob = javascript.AS_RenderTemplateWithAttachedImages(input, {
  "listXpath": "myschema:myblobList",
  "templateName": "images-with-captions",
  "convertToPdf": true
});
```

The result is a blob: return it to download it, or store it in a blob field and save the document (in this case,
remember that the rendering already saved the document once).

### The Template Document (in Web UI)

The Word template is a **File Template** document (type `TemplateSource`), created in Web UI:

1. In a folder or a workspace, **Create** a **File Template**:
   * **Title**: `images-with-captions`. The title becomes the **template name** (`tmpl:templateName`) at creation, and
     changing the title later does not change it. Template names must be unique.
   * **Content**: [templates/images-with-captions.docx](templates/images-with-captions.docx), or your own template.
2. Open the **Template Configuration** tab of the template, **Edit**:
   * **Target Document Types**: the types you render (for example `File`, `Picture`).
   * **Template Processor**: `Automatic` works (XDocReport is used for .docx files).
3. **Parameters**: nothing to add. Nuxeo may have detected `images` and `captions` when the file was uploaded: leave
   them, the scripts replace them at each rendering. You can add other parameters as usual, the scripts keep them.
4. Users who render documents need the Read permission on the template.

> [!NOTE]
> **Output format.** Web UI (LTS 2025) does not show the output format of a template (`tmpl:outputFormat`, "Rendering
> output format" in the add-on documentation). Leave it empty and use the `convertToPdf` parameter of the scripts. If
> you set `tmpl:outputFormat` to `pdf` by other means (REST API, automation), the scripts do not convert twice.

> [!IMPORTANT]
> Don't make the template "editable on the document" (`tmpl:useAsMainContent`): when binding, the add-on would replace
> the main file of the document (for a Picture, the original image) with the template. The scripts refuse such a
> template.

## Configuration

### Build Your Own Word Template

Start from [templates/images-with-captions.docx](templates/images-with-captions.docx) (open it in Word and press
**Alt+F9** to see the field codes), or build it from scratch. Shortcuts below are for Word on Windows.

1. **Fields.** Each FreeMarker directive or expression is a MERGEFIELD:
   * **Insert** > **Quick Parts** > **Field...**, category **Mail Merge**, field **MergeField**, and type the
     directive in **Field name**,
   * or press **Ctrl+F9** (inserts field braces) and type `MERGEFIELD "[#list images as img]"` between the braces,
     then **F9** to update the field.

   A directive that contains spaces must be between double quotes in the field code, otherwise Word keeps only its
   first word. Check the field codes with **Alt+F9**:

   ```
   { MERGEFIELD "[#list images as img]" \* MERGEFORMAT }
   { MERGEFIELD "[#assign _fit = img.setResize(true)]" \* MERGEFORMAT }
   { MERGEFIELD ${captions[img_index]} \* MERGEFORMAT }
   { MERGEFIELD [/#list] \* MERGEFORMAT }
   ```

2. **Placeholder picture.** Insert any picture (**Insert** > **Pictures**), for example a light grey rectangle, and
   give it the size of the box in which each image must fit: images are scaled down or up to fit this box, and keep
   their proportions.
3. **Layout "In Line with Text".** Select the picture, **Picture Format** > **Wrap Text** > **In Line with Text**.
   With a floating layout (Square, In Front of Text, ...), the picture has an absolute position on the page, and all
   the images are stacked at the same place.
4. **Bookmark.** Select the picture, then **Insert** > **Bookmark** (in the **Links** group), name `img`, **Add**.
5. **Loop.** Put each item in its own paragraph, in this order:

   ```
   «[#list images as img]»
   «[#assign _fit = img.setResize(true)]»
   [the picture, bookmark "img"]
   «${captions[img_index]}»
   «[/#list]»
   ```

   * The paragraphs that only hold a directive stay in the result as empty paragraphs: give them a small style (the
     sample uses a `Directive` style, 8 pt, no spacing after).
   * Keep `[#list]` and `[/#list]` in their own paragraphs. When `[#list]` is in the paragraph of the picture, the
     pictures after the first one take the paragraph format of the `[/#list]` paragraph.
   * Anything else can go around the loop, for example `«${doc['dc:title']}»` as in the sample.

> [!TIP]
> If Word turns the straight quotes of a field code into curly quotes ("smart quotes") as you type, FreeMarker fails.
> Turn the option off in **File** > **Options** > **Proofing** > **AutoCorrect Options** > **AutoFormat As You
> Type**, or use the **Field** dialog.

**Variant: gallery.** To show the images side by side, flowing like characters and wrapping to the next line, put
everything in **one** paragraph, with a smaller placeholder (no captions in this case):

```
«[#list images as img]»«[#assign _fit = img.setResize(true)]»[the picture, bookmark "img"] «[/#list]»
```


## How It Works

1. The script lists the images of the input document and keeps those it can render (see
   [supported formats](#issues-and-limitations)), up to `maxImages`.
2. It builds the template parameters (`templateData`) and calls
   `TemplateProcessor.Render(input, {templateName: ..., attach: true, templateData: xml})`. For a document with
   images in field torender:images #0 and #2 being images:

   ```xml
   <nxdt:templateParams xmlns:nxdt="http://www.nuxeo.org/DocumentTemplate">
     <nxdt:field name="images" type="List">
       <nxdt:field name="img0" type="picture" source="torender:images/0/file"/>
       <nxdt:field name="img1" type="picture" source="torender:images/2/file"/>
     </nxdt:field>
     <nxdt:field name="captions" type="List">
       <nxdt:field name="caption0" type="String" value="photo1.jpg"/>
       <nxdt:field name="caption1" type="String" value="photo3.png"/>
     </nxdt:field>
     <nxdt:field name="img" type="picture" source="torender:images/0/file"/>
   </nxdt:templateParams>
   ```

In this XML:

   * `images` is a `List` of `picture` parameters, one per image. Nuxeo turns it into a list of XDocReport images,
     which XDocReport accepts inside a loop.
   * `captions` is a `List` of `String` parameters, in the same order.
   * `img` is a `picture` parameter whose only role is to declare the Word bookmark `img` as an image placeholder.
     Its value is not used: inside the loop, the loop variable `img` hides it.
   * The script keeps the other parameters of the template (it replaces only `images`, `captions` and `img`).

3. The Word template loops on `images`. Each item is a MERGEFIELD, except the picture:

   ```
   «[#list images as img]»
   «[#assign _fit = img.setResize(true)]»
   [placeholder picture, In Line with Text, bookmark "img"]
   «${captions[img_index]}»
   «[/#list]»
   ```

   `img.setResize(true)` makes XDocReport fit the image in the placeholder box and keep its proportions. Without
   this line, every image is stretched to the size of the placeholder.

## Issues and Limitations

> [!WARNING]
> **Every rendering SAVES the document.** `TemplateProcessor.Render` stores the parameters on the document (and binds
> it to the template the first time). So, at each rendering:
> * `dc:modified` and `dc:lastContributor` change, and an audit entry is created,
> * automatic versioning rules may create a version,
> * "Document modified" event handlers and listeners run.
>
> => **Never call the scripts from a "ABout to Create", "Document modified" or "Before document modification"**

* **Write permission.** The user needs the Write permission on the document, and the document must not be locked by
  someone else. Versions and proxies cannot be rendered (the scripts refuse them).
* **Binding.** The first rendering binds the document to the template: it gets the `TemplateBased` facet and stores
  the template parameters. Then each rendering replaces all these parameters: changes made to the parameters of the
  document itself (if the template allows it) are lost.
* **Supported formats.** Only file names ending with `.jpg`, `.jpeg`, `.png`, `.gif` or `.bmp` (any case) are
  rendered, others are skipped (warning in the server log):
  * the add-on takes the image format from the file name: an attachment without a file name would make the rendering
    fail, and an unknown extension (`.webp`, `.heic`, ...) would put an image without a valid format in the .docx,
  * TIFF and SVG are excluded: XDocReport cannot read their size, so it cannot fit them in the box,
  * a file whose extension does not match its content (a PNG named `.jpg`) may fail or be displayed wrongly.
* **Memory and weight.** XDocReport builds the whole document in memory, and the images are embedded as they are
  (the placeholder only sets their displayed size): 20 photos of 8 MB = a 160 MB document, built in memory. Keep
  `maxImages` low (default 20), prefer reasonably sized images: Picture views `Small` or `Medium` rather than `FullHD`
  or `OriginalJpeg`. The parameters are also limited to 64 KB of XML, which is about 400 images.
* **Repeated ids.** Each image gets its own file and relationship in the .docx, but the `wp:docPr` id and the `img`
  bookmark of the placeholder are repeated for each image. Word usually accepts it, and LibreOffice (used for the PDF
  conversion) opens it, but check with your own Word version.
* **Picture views are computed asynchronously** after the upload. Until they are ready, the Picture holds placeholder
  views and `AS_RenderTemplateWithPictureViews` throws "not computed yet": try again a moment later.
* **Template lookup.** A document already bound to the template is rendered with the bound template (by id). Otherwise,
  the template is searched by name, without trashed documents and versions, and its name must be unique. If your
  templates are versioned, also set `nuxeo.templating.filterVersions=true` in `nuxeo.conf`, so the add-on does not
  bind documents to a version of the template.
* **Photos taken with a phone** may store their orientation only in their metadata (EXIF): such images may be displayed
  rotated (not tested).

## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
