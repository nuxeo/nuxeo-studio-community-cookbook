# Format the Results of a Document Suggestor

![suggest result formatters picture](suggestion-result-formatters.png)

## Description

This module shows how to format the results of a `nuxeo-document-suggestion` element. It uses the `resultFormatter` attribute to do so. The custom formatter displays the thumbnail of the documents along with the document type, lifecycle state, version, and path.

## Prerequisites

* Nuxeo Web UI
* A properly configured `nuxeo-document-suggestion` element

## Usage

You need to create a Javascript function (example provided below), which performs the formatting, bind it to a property of your element, and bind that property to the `nuxeo-document-suggestion` element.

### Formatter Function

Add this function to your custom element.

```javascript
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

### Formatter Binding

Bind the above function to a property of your element:

```javascript
properties: {
  //...
  thumbnailFormatter: {
    type: Function,
    value: function() {
      return this._thumbnailFormatter.bind(this);
    }
  }
},
```

### Bind to Suggestor

Finally bind the above property to your `nuxeo-document-suggestion` element:

```html
<nuxeo-document-suggestion result-formatter="[[thumbnailFormatter]]" ...
```

Note: for this example to work you must configure the `nuxeo-document-suggestion` element to use the `thumbnail` [enricher](https://doc.nuxeo.com/n/Q_j):

```html
<nuxeo-document-suggestion enrichers="thumbnail" ...
```

## Documentation Links

- [HOWTO: Filter Data in Suggestions](https://doc.nuxeo.com/nxdoc/how-to-filter-data-in-directory-suggestion/#going-further)
- [HOWTO: Create and Reuse a Custom Element](https://doc.nuxeo.com/nxdoc/how-to-create-and-reuse-custom-element/)
- [HOWTO: Customize Document Layouts](https://doc.nuxeo.com/nxdoc/web-ui-document-layouts/)
- [Web UI Layout Elements](https://doc.nuxeo.com/nxdoc/web-ui-layouts/)
