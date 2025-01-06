# Nuxeo Operation Button with Spinner

## Description

This is a copy of `nuxeo-operation-button`, displaying a spinner until the operation is finished (or an error opccured).

All parameters are the same as nuxeo-operation-button.

The spinner is displayed on the right, near the button, therefore:

> [!WARNING]
> _The button must be visible in the toolbar_, not hidden in the hamburger menu.

## Prerequisites

- Nuxeo Web UI

## Installation

* Open Nuxeo Studio Designer
* Upload [nuxeo-operation-button-with-spinner.html](designer/nuxeo-operation-button-with-spinner.html) to the `elements` folder in **Resources** tab; create the folder if needed

* In the **UI** tab define a new Button using the "Custom Button" action
* Choose `nuxeo-operation-button-with-spinner` for Element
* Fill the attributes as normal; be sure to:
  * Set the `input` attribute to the correct value for your slot context (e.g. `[[document]]` for "Document Actions")
  * Set the `operation` attribute to the id of your operation

All `nuxeo-operation-button` attributes are supported.

## You Are Very Welcome To...

Update the css code so as, for example, display the spinner on top of the button, things like that.