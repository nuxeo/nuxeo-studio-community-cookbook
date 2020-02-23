# Display a field with Currency format

![currency.png](currency.png)

## Prerequisites

- Property of type `Integer`

## Description

Display a field with currency format from an integer property. For more details, refers to the [Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) documentation page.

## Usage

Use the following syntax : `[[_formatCurrency(document.properties.<my_schema>:<my_property>)]]`

## Installation

### Studio Designer

- Import in your project `currency-format-behavior.html`.
- Add it to your custom bundle file.
- Import the behavior in the layout which contain field of type currency (Example: `behaviors: [Nuxeo.LayoutBehavior,Nuxeo.CurrencyFormatBehavior],`)
- Use the `_formatCurrency` syntax  for your property.

## Configuration

You can add more options and make the behavior more configurable  following the documentation.

## Documentation Links

- [Web UI Layout Elements](https://doc.nuxeo.com/nxdoc/web-ui-layouts/)
