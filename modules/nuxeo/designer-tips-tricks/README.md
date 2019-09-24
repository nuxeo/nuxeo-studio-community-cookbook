# Designer Tips and Tricks

![designer-example](designer.png)

## Prerequisites

- Web UI installed

## Description

This module helps you to tune the default element scaffolded by Studio Designer.  

## Usage

Switch to code on the layouts and elements in Studio Designer and adapt the code to your needs.

## Installation

### Studio Designer

#### Create a table with two columns

```
<div style="width:100%;margin-top: 10px;">
     <div style="float: left;width:50%;vertical-align: text-top;">
     <div style="float: right;width:50%;vertical-align: text-top;">
</div>
```

#### Position several Nuxeo elements in the same row

```
<div class="layout horizontal flex">
  <nuxeo-element1/>
  <nuxeo-element2/>
  <nuxeo-element3/>
</div>
```

Without forgetting to update the `<style>` line with `<style include="iron-flex iron-flex-alignment">`

#### Get property name and property value on the same row (as the nuxeo-document-info section)

1. Add in the `<style>` section:

```
<style>
      .properties label {
        min-width: 10em;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item {
        @apply --layout-horizontal;
        @apply --layout-flex;
        line-height: 2.2rem;
      }
      label{
        font-size: 12px;
      }
    </style>
```

2. Add your properties in your layout like

```
<h3>MY SECTION</h3>
<div class="properties">    
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

#### Put a header

```
<div style="margin-top: 20px;margin-bottom: 20px;background-color: #F2F2F2;">
  <b>HEADER</b>
</div>
```

#### CSS properties to update when creating a new theme

- Extract HTML corporate colors from a picture, like with [https://imagecolorpicker.com/](https://imagecolorpicker.com/)
- Use [https://www.w3schools.com/colors/colors_picker.asp](https://www.w3schools.com/colors/colors_picker.asp) to get colour derivatives
- Apply main color on `--nuxeo-primary-color`
- Apply a darker color from the previous one on `--nuxeo-secondary-color` and `--paper-spinner-layer-3-color`
- Apply same color as the logo on `--nuxeo-sidebar-background`
- Apply same main color on `--nuxeo-primary-color` and `--nuxeo-sidebar-background`

