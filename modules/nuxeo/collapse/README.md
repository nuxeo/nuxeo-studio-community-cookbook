# Collapse (Collapsible Element)

## Synopsis

```
<nuxeo-se-collapse collapsestyle="[[collapsestyle]]"
                   heading="[[i18n('my.element.heading')]]"
                   headingstyle="[[headingstyle]]"
                   opened$="[[opened]]"
                   >
  <!-- your content here -->
</nuxeo-se-collapse>
```

## Screenshot

<img src="nuxeo-se-collapse.png" alt="nuxeo-se-collapse">

## Module Description

`<nuxeo-se-collapse>` creates a collapsible element, to toggle the display of content. By default, the content will be collapsed. Use `opened` or `toggle()` to show/hide the content. This element provides some additional configuration options to the `<nuxeo-card>` element, including:
 - header styling
 - collapsible div content styling
 - can be used anywhere without using a `<nuxeo-card>`

## Installation

Copy the content of <a href="nuxeo-se-collapse.html">nuxeo-se-collapse.html</a> into your Nuxeo Studio Designer hierarchy.

## Usage

Import and reference the element from your layout, using <a href="my-element-example.html">my-element-example.html</a> as an example.
