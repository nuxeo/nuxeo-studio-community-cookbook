# Nuxeo Document Viewer with Loading Indicator

## Description

A wrapper around nuxeo-document-viewer that displays a loading indicator while the document is being converted to PDF or rendered if it takes more than a couple seconds.

This is particularly useful for documents that require server-side conversion (Word, Excel, PowerPoint, etc.), and the conversion takes time (=> It is useless if you display an Image, a Note, a Video, an Audio.)

<img src="01-Viewer-with-loading-message.png" alt="nuxeo-se-document-viewer" width="800">

## Prerequisites

- Nuxeo Web UI


## Installation and Usage

Typically, in Nuxeo Studio > Designer, go to "Resources", click the "UI" element (first element) and create a new folder, named "elements", then upload into this folder the nuxeo-se-document-viewer.html file.

Once uploaded, use it in places where you need to display the preview of a document. Typically, you would override the nuxeo-file-view-layout:

* Designer > UI > Layouts > Built-in Document Types > File
* Click "Configure" button for the viw layout
* Switch to code
* Add the import of `nuxeo-se-document-viewer`

```html
<!-- Assuming it was imported in the "elements" folder -->
<link rel="import" href="../../elements/nuxeo-se-document-viewer.html">
```

* Then, replace `nuxeo-document-viewer` with `nuxeo-se-document-viewer`, and make it display the blob actions:

```html
<!--
<nuxeo-document-viewer role="widget" document="[[document]]"></nuxeo-document-viewer>
-->
<nuxeo-se-document-viewer role="widget" document="[[document]]" show-blob-actions></nuxeo-se-document-viewer>
```
