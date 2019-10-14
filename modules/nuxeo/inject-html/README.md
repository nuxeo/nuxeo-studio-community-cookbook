# HTML Injection

![html-injection](html-injection.png) ![alt text 2](screenrecording.gif)

## Description

Polymer will not stamp unescaped HTML via data-binding because it becomes a vulnerability for XSS attacks. This is a workaround to inject HTML into a page using bound data, but please note that it *is still considered a vulnerability*.

## Usage

`<nuxeo-inject-html result="[[someHtmlInAFieldOrVariable]]"></nuxeo-inject-html>`

## Installation

### Studio Designer

1. Install `nuxeo-inject-html` as a Resources in Designer
2. Import `nuxeo-inject-html` in your custom bundle.
