# Related Documents

![Related Documents](nuxeo-related-documents.png)

## Prerequisites

- Nuxeo Web UI

## Description

This modules includes elements to list, add and remove document relations. It handles:
- Outgoing and Incoming relations
- Relations Type

## Usage

Integrate `<nuxeo-se-document-relations document="[[document]]"></nuxeo-se-document-relations>` element in the `view` layout of your document type.

## Installation

### Studio Modeler

- Create in the following automation scripting
  - `getAllRelations.js`

### Studio Designer

- Create a `related-documents` folder under the `UI` folder
- Import `nuxeo-se-add-relation-dialog.html`, `nuxeo-se-document-relations.html`, `nuxeo-se-remove-relation-button.html` in the `related-documents` folder.
- Create a new default translation file (`messages.json`), and add the entries of `/designer/mesages.json` without including the `{}`
