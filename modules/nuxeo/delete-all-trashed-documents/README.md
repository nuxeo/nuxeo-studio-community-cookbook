# Delete All Trashed Documentd

```
function admin_deleteAllTrashedDocuments()
```

## Module Description

JavaScript to delet _all_ documents which are in the trash of their congtainer (meaning their `ecm:iTrashed` fields is `1`).

This should be reserved to administrators.

## Usage

* Copy the content of `admin_deleteAllTrashedDocuments.js` into your automation script.
* in Studio Designer, adds a UI element to call this script. For example, add a `Button` that runs this script and whose filter is something like
  * Type is `Root`
  * User has membership of `administrators`

=> The button is displayed only for Administrators, and only a Root level.

## Installation

Nothing needed.

## Documentation Links

- [Working in Studio Modeler](https://doc.nuxeo.com/studio/working-in-studio/)
