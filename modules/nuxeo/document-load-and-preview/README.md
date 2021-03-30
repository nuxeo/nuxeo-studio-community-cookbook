# Document Load and Preview

## Description

Say you have a field of type Document, and you want to add a preview of the linked document to your layout. The WebUI element `nuxeo-document-viewer` (and by extension `nuxeo-document-preview`) will not fetch a document given just a UUID, nor will it make sure the document has the correct schemas and enrichers so that the preview works correctly. This makes it difficult to use as a generic viewer for documents.

This element is a replacement that ensures we have the necessary info for the preview to work. It also adds 3D support (assuming of course that you have [Nuxeo 3D](https://doc.nuxeo.com/n/awp) installed).

You can bind just a document UUID, or a resolved document object.

## Prerequisites

- Nuxeo Web UI

## Installation

### Studio Designer

- Upload [the document-load-and-preview element](designer/document-load-and-preview.html) to the `elements` folder in **Resources** tab of Nuxeo Studio Designer.

## Usage

* Import `elements/document-load-and-preview.html` where needed
* Use the `document-load-and-preview` element any time you want to show the preview of a document; bind any document ID/object/field using the `document` attribute:

```
      <document-load-and-preview document="[[document.properties.alert:targetDoc]]"></document-load-and-preview>
```

* You can optionally specify a different XPath for preview if your document does not use `file:content` using the `xpath` attribute.