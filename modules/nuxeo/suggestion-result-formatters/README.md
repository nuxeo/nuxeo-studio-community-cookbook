# Suggestion Result Formatters

![suggest result formatters picture](suggestion-result-formatters.png)

## Description

Functions to be used to format the results of suggestion widgets in WebUI (i.e. bound to the `result-formatter` property of a suggestion widget).

## Usage

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

Make sure your suggestor returns thumbnails when using `thumbnailFormatter`:

`<nuxeo-document-suggestion enrichers="thumbnail" ...`

Use the formatter in a widget:

`<nuxeo-document-suggestion result-formatter="[[thumbnailFormatter]]" ...`

## Installation

There is nothing to install, just copy and paste the code in your element.
