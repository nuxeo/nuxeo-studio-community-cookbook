# Display Data with Currency Formatting

![currency.png](currency.png)

# Description

Display data with currency format. Uses [Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).

# Usage

`[[_formatCurrency(value)]]`

# Installation

## Studio Designer

- Add [currency-format-behavior.html](designer/currency-format-behavior.html) to your Studio project (tip: use the `elements` folder)
- Import it into your custom bundle file (i.e. `<link rel="import" href="elements/currency-format-behavior.html">`)
- Add the behavior to the element that contains the data you want to format (Example: `behaviors: [Nuxeo.LayoutBehavior,Nuxeo.CurrencyFormatBehavior],`)

Alternatively:

- Copy the `_formatCurrency()` function from [currency-format-behavior.html](designer/currency-format-behavior.html) and paste it as a method for your element

# Documentation Links

- [Web UI Layout Elements](https://doc.nuxeo.com/nxdoc/web-ui-layouts/)
