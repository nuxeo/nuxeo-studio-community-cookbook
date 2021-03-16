# Nuxeo Operation Button with Navigation

## Description

An element that, given an Automation operation that returns a document, navigates to that document.

In Studio Designer it is not possible to define a Button (using `nuxeo-operation-button`) that navigates to the result of the operation. This element can be used instead of `nuxeo-operation-button` for this purpose.

## Prerequisites

- Nuxeo Web UI

## Usage

* In Designer define a new Button using the "Custom Button" action
* Choose `nuxeo-operation-button-with-navigation` as the element
* Fill the attributes as normal; be sure to:
  * Set the `input` attribute to the correct value for your slot context (e.g. `[[document]]` for "Document Actions")
  * Set the `operation` attribute to the id of your operation

Note that not all `nuxeo-operation-button` attributes are supported. Non-relevant attributes (e.g. `download`) have been removed since this button is for navigation.

Important: make sure your operation returns a document.

## Installation

### Studio Designer

- Upload [the button](designer/nuxeo-operation-button-with-navigation.html) to the `elements` folder in **Resources** tab of Nuxeo Studio Designer.
