# Replace Rendition (Picture and Video)

## Prerequisites

- Nuxeo Web UI

## Description

This cookbook is oriented for `Picture` and `Video` document subtypes.

In Nuxeo Platform, when a `Picture` or `Video` is imported, renditions are generated automatically. By default, Nuxeo only allow the user to download a rendition. If you need to set a specific preview or thumbnail for a video instead of the random picture extraction or when the preview quality/content is not satisfying, you will need to replace that rendition: this contribution will solve these issues by providing an easy way to replace any rendition in the rendition list.

## Usage

Replace a rendition with a custom one in the rendition panel.

## Solution implementation details

The contribution is composed of the following element:

- `custom-rendition-update-blob-action.html`: the element that contains the button and the modal to update the rendition.
- `custom-picture-formats.html`: the updated version of `nuxeo-picture-formats` that contains the `custom-rendition-update-blob-action.html` element
- `custom-video-conversions.html`: the updated version of `nuxeo-video-conversions` that contains the `custom-rendition-update-blob-action.html` element
- `custom-replace-blob-button.html`: the updated version of `nuxeo-replace-blob-button.html` that is used to control/filter the file type during the import
- `custom-dropzone.html`: the updated version of `nuxeo-dropzone.html` that is used to display a message on wrong file type during import

## Configuration

- Add the `File` facet to the document schemas
- Update the `nuxeo-[document_type]-view-layout` and replace as you need: 
    - `nuxeo-picture-formats` with `custom-picture-formats.html`, if you want to add the ability to replace `Picture` renditions
    - `nuxeo-video-conversions` with `custom-video-conversions.html`, if you want to add the ability to replace `Video` renditions
- Update `_acceptedBlob` function in `custom-replace-blob-button` to add/remove filter on `mime-type` or `file extension`
- Update `_upload` function in `custom-dropzone` to add/remove filter on `mime-type` or `file extension` (according to `custom-replace-blob-button`) and to update the error message (if needed)

## Issues and Limitations

Replacing renditions in this way presents limits:
- Document preview can be misleading:
  - `Picture` document preview is the `FullHD` rendition
  - `Video` document preview is the `1st element` in the rendition list
  - Modifying one of those rendition will lead to a state where preview is not the main content. It can be corrected by updating `computeImageSource` and `computeVideoSources` functions in `nuxeo-document-preview`
- Document thumbnail can be misleading
  - `Picture` thumbnail is the `Small size` rendition
  - Modifying this rendition will lead to a state where thumbnail is not the main content. It can be corrected by updating the `_thumbnail` function in `nuxeo-document-thumbnail`