# Progress Bar

![progress-bar](progress-bar.png)

## Prerequisites

- Nuxeo Web UI

## Description

It allows you to display a progress bar when using a property related to a status (in percentage)

## Usage

Integrate the visual element in any result layouts or document layouts.

## Installation

### Studio Modeler

- Create a property, of type `Integer` or `Floating Point`, with interval value between `0` and `100`.

### Studio Designer

- Select the layout you need to edit
- Add the following CSS contribution in the `<style>` tag:
```
.wrapper {
        width: 500px;
      }
.progress-bar {
        width: 100%;
        background-color: #e0e0e0;
        padding: 3px;
        border-radius: 3px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
      }

      .progress-bar-fill {
        display: block;
        height: 22px;
        background-color: #659cef;
        border-radius: 3px;
        transition: width 500ms ease-in-out;
      }
```
- In the `<template>` tag, add and adapt with your custom property:

```
<label>Percentage</label>
      <div class="wrapper">
        <div class="progress-bar">
          <span class="progress-bar-fill" style="width:[[document.properties.MYSCHEMA:MYPROPERTY]]%"><center>[[document.properties.MYSCHEMA:MYPROPERTY]]&nbsp;%</center></span>
        </div>
      </div>
```

## Configuration

- You can freely update the colour of the loading bar or other styling options.

## Documentation Links

- [HOWTO: Create and Reuse a Custom Element](https://doc.nuxeo.com/nxdoc/how-to-create-and-reuse-custom-element/)
- [Web UI Layout Elements](https://doc.nuxeo.com/nxdoc/web-ui-layouts/)
