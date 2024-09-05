# Preview TIFF Attachments

## Description

The [attachments](https://doc.nuxeo.com/userdoc/content-edit/#managing-attachments) feature in Nuxeo Web UI does not support the preview of `TIFF` files.

Explanation: For all image mime-types (i.e. `image.*|application/photoshop|illustrator|postscript`), `nuxeo-document-preview` tries to use the the "FullHD" rendition (which is a JPG). If it's not found, it just uses the raw BLOB URL. See https://github.com/nuxeo/nuxeo-elements/blob/45f02660115411ca24540979e2ddb7974d9bcb1c/ui/nuxeo-document-preview.js#L280

For a Picture Document with the TIFF as the source this works fine because the "FullHD" rendition is available. For a TIFF stored as an attachment, there are no renditions; the raw blob is used for the preview but the browser can't render it.

This module provides a solution by dynamically converting the TIFF to a JPG and using a custom element to display it.

## Installation

* Install [IMAGE2JPG_CONVERTER.xml](modeler/IMAGE2JPG_CONVERTER.xml) as an [XML Extension](https://doc.nuxeo.com/n/22q#contributing-using-nuxeo-studio) in Studio Modeler
* Upload [nuxeo-preview-button-tiff.html](designer/nuxeo-preview-button-tiff.html) to the `elements` folder using the Resources tab in Studio Designer (create the folder if it does not exist)

## Usage

Generally speaking you will want to disable the OOTB BLOB preview button and use `nuxeo-preview-button-tiff` instead. You can disable the `previewBlobAction` via Nuxeo Studio Designer in the Buttons section. Then make a new contribution for the `nuxeo-preview-button-tiff` element using the same settings:

* Slot: `BLOB_ACTIONS`
* Order: `20`

