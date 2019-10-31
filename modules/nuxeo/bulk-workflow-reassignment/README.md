# Bulk Workflow Reassignment

![task_reassignment](task_reassignment.png)

## Prerequisites

It will work **only for task that allows reassignment**. By default, this option is set to `false` when creating a new task. Hence, the default Nuxeo workflow (serial and parallel workflow templates) doesn't allow reassignment.

## Description

This module helps you build the necessary operations to execute bulk reassignment in workflows. it is useful for applications using intensively workflows with people aiming at moving from one department to another, or in case of departure.

We provide two options to comply with this use case:
- A recommended one using the `TaskService` implementation
- A non-recommended using the Nuxeo REST API and task endpoint

:warning: The script assume you have previously fetched the documents which needs to be reassigned. You can use the `Repository.Query` before the code logic if needed.

## Usage

Deploy the operations and reuse it in any context. Ideally, in an Administration screen.

## Installation

### Studio Modeler

#### Using Workflow Class - RECOMMENDED

- Add the content of `extension.xml` as XML Extension in **Advanced Settings** > **XML Extensions**
- Create an automation scripting with the content of `AS_BulkWorkflowReassignment.js`
  - Inputs and Outputs would be `documents`
  - Create the `initialActor` parameter to identify the user to be removed from the workflow taskId
  - Create the `newActors` parameter to identify the users who will receive the tasks from `initialActor` (comma separated list of values)
- Reuse the operation in any context:
  - From the automation chain menu, the two parameters will be displayed and can be filled with variables
  - You can execute it from a button, or from an event (if using a listener looking for users moving from one group to another for example)

#### Using Nuxeo REST API - NOT RECOMMENDED

You can alternatively use the Nuxeo REST API, but it requires to set explicitly the authentication information in the REST Call. So it would be relevant only if the Administrator credentials are set within the **Roles & Permissions** > **Users & Groups** menu.

```
var serverURL = Env["nuxeo.url"];
var endpoint = "/api/v1/task/";
var URL = serverURL + endpoint + currentTask.id;
URL = URL + "/reassign";
URL = URL + "?actors=newActors";
Console.log("URL: "+URL);
URL = encodeURI(URL);
Console.log(URL);
resultBlob = HTTP.call("Administrator", "<ADMIN_PASSWORD>", "PUT", URL);
resultObject = null;
Console.log(resultBlob.getString());
```

## Documentation Links

- [Workflow Platform Services](https://doc.nuxeo.com/nxdoc/workflow/)
- [Using Workflow APIs](https://doc.nuxeo.com/nxdoc/using-workflows/)
- [Workflow Tutorials](https://doc.nuxeo.com/nxdoc/workflow-tutorials/)
- [Workflow How-to index](https://doc.nuxeo.com/nxdoc/workflow-how-to-index/)
