# Workflow Status

![layout](workflow-status.png)

## Module Description

Module to monitor workflow instances status displayed in the "Analytics" area of Web UI.

:information_source: There is currently no data generation so this will only display real, running workflow tasks.

## Usage

As a Nuxeo Administrator, navigate to Admin -> Analytics -> Workflow Status.

## Installation

### Studio Modeler

- Install WORKFLOW_STATUS.xml as an **XML Extension**.
- Install the script in the `automation` folder as an **Automation Script**.
- Create a **Page Provider** for workflow tasks:
  - id: `workflow-status`.
  - filter: `ecm:currentLifeCycleState = 'opened' AND ecm:primaryType = 'RoutingTask'`.
  - :warning: delete the default filter, only use the above values.

### Studio Designer

- Install the content in the `ui` folder as Resources in Designer (including the subfolders).

## Documentation Links

- [Workflow in Nuxeo Studio Modeler](https://doc.nuxeo.com/studio/workflow/)
- [Workflow Platform Services](https://doc.nuxeo.com/nxdoc/workflow/)
