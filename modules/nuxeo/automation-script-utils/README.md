# Automation Script utilities

## Prerequisites

- None

## Description

Miscellaneous utilities to be used with JS Automation.

## Usage

Look at the script you need and copy/paste it in your Studio project. The comments in the "header" explain how to use it.

- Make sure to set the `input`  and the `output` of your script as expected in the comments.
- Don't forget to explicitly declare the parameter(s). They also are described in the comments.

<table width="100%">
  <tr style="font-weight:bold">
    <th>Automation Scripting</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="modeler/utils_FollowTransitionIfPossible.js">utils_FollowTransitionIfPossible</a></td>
    <td>FollowLifecycleTransition throws an error if the Document is in a state that does not allow following the transition. When bulk updating a list of documents, we may want to avoid that</td>
  </tr>
  <tr>
    <td><a href="modeler/utils_getUserFullName.js">utils_getUserFullName</a></td>
    <td>Receives as input a user ID, returns a string, the full name (firstname + " " + lastname)</td>
  </tr>
  <tr>
    <td><a href="modeler/utils_LockDocument.js">utils_LockDocument</a></td>
    <td>Lock the input doc if it was not already locked (avoid a NuxeoException)</td>
  </tr>
  <tr>
    <td><a href="modeler/utils_PictureGetView.js">utils_PictureGetView</a></td>
    <td>Set ctx.pictureView Context Variable to the PictureView object, whose title is passed in the viewName parameter (null if not found)</td>
  </tr>
  <tr>
    <td><a href="modeler/utils_SetLifleCycleState.js">utils_SetLifleCycleState</a></td>
    <td>Used mainly when setting up some data (typically demo data)</td>
  </tr>
  <tr>
    <td><a href="modeler/utils_UnlockDocument.js">utils_UnlockDocument</a></td>
    <td>Unlock the input doc if it was not already unlocked (avoid a NuxeoException)</td>
  </tr>
</table>

## Installation

### Studio Modeler

Create the automation script(s) and copy the content from the original(s). You can of course change the names to fit your naming convention.

## Documentation

- [Automation Platform Services](https://doc.nuxeo.com/nxdoc/automation/)
- [Automation Scripting](https://doc.nuxeo.com/studio/automation-scripting/)
