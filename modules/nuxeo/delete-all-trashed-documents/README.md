# Delete All Trashed Documents

```
function admin_deleteAllTrashedDocuments()
```

## Prerequisites

None

## Description

JavaScript to delet _all_ documents which are in the trash of their congtainer (meaning their `ecm:iTrashed` fields is `1`). This should be reserved to administrators.

## Usage

Execute the cleanup action from a UI element, an event or a scheduler.

## Installation

### Studio Modeler

* Copy the content of `admin_deleteAllTrashedDocuments.js` into your automation script.

### Studio Designer

* Add a UI element to call this script. For example, add a `Button` that runs this script and whose filter is something like
  * Type is `Root`
  * User has membership of `administrators`

=> The button is displayed only for Administrators, and only a Root level.

## Documentation Links

- [Trash Service](https://doc.nuxeo.com/nxdoc/trash-service/)
- [Trash Service](https://doc.nuxeo.com/nxdoc/garbage-collecting-orphaned-binaries/)
- [HOWTO: Disable Trash Actions, Tab and Search](https://doc.nuxeo.com/nxdoc/how-to-disable-trash/)
