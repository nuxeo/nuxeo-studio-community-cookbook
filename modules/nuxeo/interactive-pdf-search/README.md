# Search Text-Based PDF with Metadata

![search-pdf-metadata.png](search-pdf-metadata.png)

## Prerequisites

Should be used on document types that provide a PDF preview of contents.

## Description

Locate text data in the PDF that matches the value of a corresponding metadata value.

## Usage

A spyglass icon will be available for the end-user action.  Once clicked, the PDF will search the document for the corresponding matches.  For example, in the screenshot, the user has clicked on the spyglass icon next to "Description", which corresponds to `dc:description`'s metadata value.  The PDF view on the left has updated to find 2 matches of `earum` in the document.

## Installation

1. Copy the elements in the `designer` directory to your project's `UI/elements` folder.
2. Import both elements into your project's custom-bundle file.
3. Add the search elements to metadata that may be found in the document (e.g., `<search-pdf-with-metadata xpath="dc:description"/>`) - this will trigger the search of the PDF with the metadata field's value.
4. Add the `Nuxeo.PDFViewerSearchBehavior` and document observer to your View layout.  The behavior will update the PDF viewer to search for the value specified by the metadata.

## Examples

### Import elements into custom bundle

```html
<link rel="import" href="elements/search-pdf-with-metadata.html">
<link rel="import" href="elements/nuxeo-pdf-viewer-search-behavior.html">
```

### Search Trigger

Use the `search-pdf-with-metadata` element to trigger searches on the `dc:description` value.  Change the `xpath` attribute to the field you wish to use for search.

```html
<div role="widget" hidden$="[[!document.properties.dc:description]]">
  <label>[[i18n('label.dublincore.description')]] <search-pdf-with-metadata xpath="dc:description"/></label>
  <div name="description" class="multiline">[[document.properties.dc:description]]</div>
</div>
```

### Layout View

See [the layout example](examples/nuxeo-file-view-layout.html) for a complete usage.

Add behavior:

```javascript
behaviors: [Nuxeo.LayoutBehavior, Nuxeo.PDFViewerSearchBehavior],
```

Make the document observable with the `_pdfSearchDocumentChanged` function:

```javascript
/**
 * @doctype File
 */
document: {
  type: Object,
  observer: "_pdfSearchDocumentChanged"
}
```

## Documentation Links

- [Web UI Layout Elements](https://doc.nuxeo.com/nxdoc/web-ui-layouts/)
