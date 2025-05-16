# Designer Tips and Tricks

![designer-example](designer.png)

## Contents
- [Designer Tips and Tricks](#designer-tips-and-tricks)
  - [Contents](#contents)
  - [Prerequisites](#prerequisites)
  - [Description](#description)
  - [Usage](#usage)
  - [Examples](#examples)
    - [How to Customize the Columns in the View Layout for a Folderish Document Type](#how-to-customize-the-columns-in-the-view-layout-for-a-folderish-document-type)
    - [Refresh current folder's listing after clicking an operation action that moves one of the child document](#refresh-current-folders-listing-after-clicking-an-operation-action-that-moves-one-of-the-child-document)
    - [Suggestion formatters](#suggestion-formatters)
    - [Layout Elements in a Row](#layout-elements-in-a-row)
    - [Horizontal Property Layout](#horizontal-property-layout)
    - [Minimum Themeing](#minimum-themeing)
    - [Change Size of OOTB Create and Edit Dialogs](#change-size-of-ootb-create-and-edit-dialogs)
    - [Set Height of nuxeo-data-table](#set-height-of-nuxeo-data-table)
    - [Update Nuxeo Favicon](#update-nuxeo-favicon)

## Prerequisites

- Nuxeo Web UI
- Nuxeo Studio project

## Description

This module contains small code snippets or examples for Nuxeo Studio Designer that are simple enough so as to not require a separate module.

## Usage

Most examples require editing source code; open the layout/element in Designer and click the "switch to code" button at the bottom of the page to access the source code, or use the Resources tab.

## Examples

### How to Customize the Columns in the View Layout for a Folderish Document Type

When Designer scaffolds the View layout for a folderish document type, it automatically adds the necessary scaffolding to have a column-based listing, but the available columns are hard-coded (e.g. Title, Date Modified, Last Contributor, etc.) In order to have your own custom columns, need to modify the source code as the [table editor](https://doc.nuxeo.com/nxdoc/web-ui-search/#visually-configure-table-results-layout) is only available for Search Result layouts.

Here are the steps:

1. Open the source code of the View layout and edit the `schemas` attribute of the  `nuxeo-page-provider` element to include the schemas required for your columns. Note that the list is comma separated and you must use the `name` of the schema (not the `prefix).

2. Add columns; the default columns that Designer generates contain examples of most types. Copy and paste the existing columns and adapt the params as needed.

### Refresh current folder's listing after clicking an operation action that moves one of the child document

Add this section to your custom action button function:

```js
var op = this.$.op; <=== Assuming your nuxeo-operation element id is "op"
op.headers || (op.headers = {});
op.headers["nx_es_sync"] = true;
```
### Suggestion formatters

If you are not satisfied with the padding and margin of the suggestion elements, you can use the formatters instead:

- `[[formatDirectory(document.properties.XXX:XXX)]]` for vocabularies
- `[[formatVersion(XXX)]]` for versions

For multivalued properties, here is [an example](https://github.com/nuxeo/nuxeo-web-ui/blob/10.10/elements/nuxeo-results/nuxeo-document-content.html#L204)

The complete list is available [here](https://github.com/nuxeo/nuxeo-elements/blob/master/ui/nuxeo-format-behavior.js)

### Layout Elements in a Row

Polymer contains all the CSS classes necessary to position and align elements in both row and column-based layouts, with no need for custom CSS to make sure things are lined up and centered.

First you need to make sure to import the Polymer iron-flex CSS libraries. Modify the the `include` attribute of the `style` element to make sure and include `iron-flex` and `iron-flex-alignment`; put `nuxeo-styles` at the end e.g.:

```
    <style include="iron-flex iron-flex-alignment nuxeo-styles">
```

You can then use the iron-flex CSS classes to easily control how contents are positioned. This will lay out 3 elements in a row, insuring the are evenly spaced and that the row fits the width of the page:

```
<div class="layout horizontal flex">
  <nuxeo-element1/>
  <nuxeo-element2/>
  <nuxeo-element3/>
</div>
```

### Horizontal Property Layout

By default Designer generates code to display properties with the label above the value. If you'd prefer to have the layout be horizontal, as seen in the `nuxeo-document-info` widet:

1. Add in the `<style>` element:

```css
      .properties label {
        min-width: 10em;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item {
        margin-left: 10px;
      }
      label{
        font-size: 12px;
      }
      .properties div {
        min-width: 50em;
      }
```

2. Add your properties in your layout like

```html
<h3>MY SECTION</h3>
<div class="layout">
      <div class="item">
        <label>My first property</label>
        <my-element/>
    	</div>
      <div class="item">
        <label>My second property</label>
        <my-element/>
      </div>
</div>
```

### Minimum Themeing

Web UI themes contain quite a few CSS mixins but there are only a few that really need to be modified to get a nice look and feel:

- Extract HTML corporate colors from a picture, like with [https://imagecolorpicker.com/](https://imagecolorpicker.com/).
- Use [https://www.w3schools.com/colors/colors_picker.asp](https://www.w3schools.com/colors/colors_picker.asp) to get colour derivatives.
- Apply main color on `--nuxeo-primary-color`. Eventually apply the same main color on `--nuxeo-sidebar-background`.
- Apply a darker color from the previous one on `--nuxeo-secondary-color` and `--paper-spinner-layer-3-color`.
- Update the default font like (`--nuxeo-app-font: 'Arial', Helvetica, sans-serif;`)


### Change Size of OOTB Create and Edit Dialogs

Add to your theme the following CSS variables:

```
--nuxeo-document-create-popup-height
--nuxeo-document-create-popup-width
--nuxeo-document-form-popup-max-height
--nuxeo-document-form-popup-min-width
```

### Set Height of nuxeo-data-table

By default, the `<nuxeo-data-table>` element has a fixed height. To make it dynamic, add these CSS contribution into the `<style>` tag.

```
  nuxeo-data-table,
  nuxeo-data-grid,
  nuxeo-data-list {
      display: block;
      position: relative;
      min-height: calc(100vh - 130px - var(--nuxeo-app-top));
  }
```
### Update Nuxeo Favicon

- Get/create your source favicon image (preferably SVG format).
- Go to: https://realfavicongenerator.net/
  - Click “Select your Favicon image” and upload your source image.
  - Go to section “Favicon for Android Chrome” → “Assets”, select “Modern versions” option “Create all documented icons” (need this to generate android-chrome-384x384.png)
  - Go to section “Favicon Generator Options” → “App name”, set “Specific app name” = “Nuxeo” (or other client/project name as appropriate)
  - Fill in other relevant details as appropriate (or just leave defaults as is)
  - Click “Generate your Favicons and HTML code” button at bottom.
  - Click the (Download your package) “Favicon package”. It might take a minute for the button to appear after generating all the Android Chrome renditions.
  - Extract downloaded zip file locally.
- Create icon-128x128.png from one of the downloaded files e.g.
  - `convert android-chrome-256x256.png -resize 128x128 icon-128x128.png`
- Create 144 pixel renditions e.g.
  - `cp mstile-144x144.png ms-icon-144x144.png`
  - `cp mstile-144x144.png ms-touch-icon-144x144-precomposed.png`
- In Studio, Navigate to Designer → Resources, create the following folder structure: `UI/images/touch`
- Upload the following files:

```
android-chrome-192x192.png
android-chrome-384x384.png
apple-touch-icon.png
favicon.ico
favicon-16x16.png
favicon-32x32.png
icon-128x128.png
ms-icon-144x144.png
ms-touch-icon-144x144-precomposed.png
mstile-150x150.png
safari-pinned-tab.svg
```

- Copy `/ui/manifest.json` from core platform and change name and short_name as appropriate.
- Copy `/ui/index.jsp` from core platform and change as follows:
  - Change all href values to use full pathnames (see: NXP-28681 - Context not set correctly when navigating back to dashboard after workflow completion OPEN
  - Change: `href="<%=context%>/icons/favicon.ico"` to ` href="/nuxeo/ui/images/touch/favicon.ico"`
