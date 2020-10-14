# Custom Document Suggestion

![suggest result formatters picture](suggestion-result-formatters.png)

## Prerequisites

- Nuxeo Web UI

## Description

This module helps you build a custom display for your `nuxeo-document-suggestion` element, thanks to the `resultFormatter` element attribute.

## Usage

Customize the document suggestion in any web element and the user will have a rich suggestion instead of having document path suggestions.

## Installation

We will illustrate the installation through an example, with a Document property displaying the chosen image to apply for watermark on the current document.

### Studio Modeler

- Create a custom page provider to list the document which should appear in your suggestion element.
  - `VideoUtils_Watermark_PageProvider`
  - :warning: You need to end the **Query Filter** by `AND ecm:fulltext = '?*'` and **uncheck** in the Advanced Configuration the checkbox of **Quote parameters**.
- Create a property of type `Document` in the schema definition if needed.
  - No the case here in this example

### Studio Designer

- Switch to code on the layout / element which uses the property (converted in `nuxeo-document-suggestion`).
- Edit the element according to your needs

```
<nuxeo-document-suggestion
                    role="widget"
                    enrichers="thumbnail" // Make sure your suggestor returns thumbnails
                    id="docSuggWatermark"
                    label="[[i18n('video.watermark.label.watermarkImage')]]"
                    name="watermarkDocId"
                    value="{{XXXX}}" // YOUR DOCUMENT PROPERTY (ex: document.properties["mycustomschema:watermark"])
                    page-provider="VideoUtils_Watermark_PageProvider" // Link to the page provider we've defined before
                    placeholder=""
                    min-chars="0"
                    result-formatter="[[thumbnailFormatter]]" // Formatter used to create the custom display (HTML)
                    required="true">
</nuxeo-document-suggestion>
```

- Update the default behaviors: The Select2Behavior is required to use escapeHTML().
```
Polymer({
      is: 'video-watermark',
      behaviors: [Nuxeo.LayoutBehavior, Nuxeo.Select2Behavior],
```

Bind the formatter to a property in your element:

```
properties: {

  thumbnailFormatter: {
    type: Function,
    value: function() {
      return this._thumbnailFormatter.bind(this);
    }
  }
},
```

- Create the Formatter logic and UI:

```
_thumbnailFormatter: function(doc) {

  if (doc && doc.properties && doc.contextParameters && doc.contextParameters.thumbnail) {

    // These values are used in the second row
    var lable1 = "Type";
    var value1 = doc.type;

    var lable2 = "State";
    var value2 = doc.state;

    var lable3 = "Version";
    var value3 = doc.properties["uid:major_version"] + "." + doc.properties["uid:minor_version"];

    var markup = "";

    markup += "<table width='100%'><tbody>";
    markup += "<tr>";
    // Thumbnail
    markup += "<td width='100px' style='text-align: center'>";
    markup += "<img src='" + doc.contextParameters.thumbnail.url + "' style='max-width: 100px; max-height=25px;' >";
    markup += "</td>";
    // Details
    markup += "<td>";
    // First Row
    markup += "<div style='margin-left:15px'><span style='font-weight: bold; font-size: large'>";
    markup += doc.title + "</span>";
    // Second Row
    markup += "<br /> <span style='font-weight: bold;'>" + lable1 + ":</span> " + value1;
    markup += " <span style='font-weight: bold;margin-left:15px;'>" + lable2 + ":</span> " + value2;
    markup += " <span style='font-weight: bold;margin-left:15px;'>" + lable3 + ":</span> " + value3;
    // Third Row
    markup += "<br /> <span style='font-weight: bold;'>Path:</span> " + doc.path;
    markup += "</div>";
    markup += "</td>";
    markup += "</tr>";
    markup += "</tbody></table>";

    return markup;
  }
}
```


## Documentation Links

- [HOWTO: Create and Reuse a Custom Element](https://doc.nuxeo.com/nxdoc/how-to-create-and-reuse-custom-element/)
- [HOWTO: Customize Document Layouts](https://doc.nuxeo.com/nxdoc/web-ui-document-layouts/)
- [Web UI Layout Elements](https://doc.nuxeo.com/nxdoc/web-ui-layouts/)
