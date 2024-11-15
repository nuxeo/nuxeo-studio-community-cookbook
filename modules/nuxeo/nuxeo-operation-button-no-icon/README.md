# Nuxeo Operation Button without Icon

## Description

This is a copy of `nuxeo-operation-button` but using `paper-button` instead of `paper-icon-button` so that an icon is not required.

Also includes a small conceit to style the button with `primary` since nuxeo-operation-button doesn't seem to support it.

And a bug fix for https://jira.nuxeo.com/browse/ELEMENTS-1071; nuxeo-operation-button doesn't actually use the `response` param.

## Prerequisites

- Nuxeo Web UI

## Installation

* Open Nuxeo Studio Designer
* Upload [nuxeo-operation-button-no-icon.html](designer/nuxeo-operation-button-no-icon.html) to the `elements` folder in **Resources** tab; create the folder if needed

* In the **UI** tab define a new Button using the "Custom Button" action
* Choose `nuxeo-operation-button-no-icon` for Element
* Fill the attributes as normal; be sure to:
  * Set the `input` attribute to the correct value for your slot context (e.g. `[[document]]` for "Document Actions")
  * Set the `operation` attribute to the id of your operation

All `nuxeo-operation-button` attributes are supported.
