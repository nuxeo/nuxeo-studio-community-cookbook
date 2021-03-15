# salesforce-ui

![layout](sfdc-webui.png)

## Prerequisites

- [Nuxeo for Salesforce](https://connect.nuxeo.com/nuxeo/site/marketplace/package/nuxeo-salesforce)

## Description

[Layout Blocks](https://doc.nuxeo.com/studio/ui-designer/#layout-blocks) to display and/or edit Salesforce metadata when using [nuxeo-salesforce](https://doc.nuxeo.com/n/QMl). By default `nuxeo-salesforce` maps SFDC objects to Workspace documents. Therefore the default Workspace layout won't display any of the SFDC metadata. The layouts included here can be used in the default layouts to display and/or edit the SFDC metadata.

## Installation

### Studio Designer

* Install or create Layout Blocks for [designer/ui/forms/sfdc-metadata.html](designer/ui/forms/sfdc-metadata.html) and [designer/ui/forms/sfdc-edit.html](designer/ui/forms/sfdc-edit.html) in Studio Designer
  * You can use these Layout Blocks as you like, of course
* (Optional) Install the [Workspace layout overrides](designer/ui/document/workspace). The View and Metadata layouts are overridden to use the above Layout Blocks when working with a Workspace. Note that the Layout Blocks will only be displayed if the Workspace actually contains SFDC metadata.

## Documentation Links

- [Nuxeo for Salesforce](https://doc.nuxeo.com/nxdoc/nuxeo-for-salesforce/)

