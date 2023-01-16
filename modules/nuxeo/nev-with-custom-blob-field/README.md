# nev-with-custom-blob-field

![nev-with-custom-blob-field.png](nev-with-custom-blob-field.png)

## Prerequisites

- Nuxeo Web UI

## Description

This element allows for display Nuxeo Enhanced Viewer for a blob that is not stored in `file:content`.

By default, NEV displays the main blob. The element doing so uses an operation server side (`Document.ARenderGetPreviewerUrl`). This operation accepts an optional parameter, `blobXPath` (set to `file:content`).

Our element, `nev-with-blobxpath` allows for specifying the XPath of a blob, this blob will then be sent to Nuxeo Enhanced Viewer.

## Usage/Installation

See `nev-with-blobxpath.html` in this module. Copy/paste it (or upload it) to your project, then use it as explained in its comments.

For example, say you have a blob in the `myschema:myfield` of thje `MyDoc` document. In the `nuxeo-mydoc-view-layout.html`, you could add:

```
<!-- Adapt the path to the location where you stored nev-with-blobxpath.html --> 
<link rel="import" href="../../myelements/nev-with-blobxpath.html">
. . .
. . .
<nev-with-blobxpath document="[[document]]" blob-path="myschema:myblob"></nev-with-blobxpath>
. . .
```

Notice it can be used in another layout, or in a tab, etc.

As for other modules, don't hesitate to modify it once imported, to fit your needs: Maybe you want to show/hide depending on permissions, or you want to tune the behavior, etc?


