# Create a Link to a Task from Automation

# Description

It can useful to create links directly to Tasks, for example to use in an email template. Unfortunately there's no OOTB way to create a link to a task, but with a little configuration and string manipulation we can do it ourselves.

# Prerequisite

Your Automation needs to run the context of a Task event e.g. the `workflowTaskAssigned` event. You can configure this in Nuxeo Studio:

* Modify the "Core Events" [registry](https://doc.nuxeo.com/n/u5c) to expose the `workflowTaskAssigned` event:
```json
{
  "events": {
    "workflowTaskAssigned": "Workflow Task Assigned"
  }
}
```

* Create an Event Handler to catch the "Workflow Task Assigned" event
* If you want the event handler to fire only for certain Tasks, add a Custom EL Expression to filter it using the "Node Id" for the task. You can get the Node Id from the [Workflow editor](https://doc.nuxeo.com/n/yEo):

```groovy
Event.context.getProperty("nodeId") == "Case_Intake-20231003155626144-approve-task"
```

# Usage

To create a link in an Automation Chain, use this expression:

```
@{Env["nuxeo.url"]}/ui/#!/tasks/@{Context["Event"].getContext().getProperty("taskInstance").id}
```

And in Automation Scripting:

```javascript
var taskURL = Env["nuxeo.url"] + "/ui/#!/tasks/" + ctx.Event.getContext().getProperty("taskInstance").id;
```

# Example

Given an email template named "CaseLetterEmail" that contains:

```html
<a href="${linkUrl}">Link to Task</a>
```

Our Automation Script does:

```javascript
  var mailFrom = "your-sender"; // Tip: use Env["custom.email.property"] so you don't have to hard-code the sender
  var mailTo = "your-recipient"; // Tip: you can use ctx.Event.getContext().getProperty("recipients") but remember it returns a list
  var emailTemplate = "template:CaseLetterEmail";

  var taskURL = Env["nuxeo.url"] + "/ui/#!/tasks/" + ctx.Event.getContext().getProperty("taskInstance").id;

  // Save the URL to a context var
  Context.SetVar(
    null, {
    'name': "linkUrl",
    'value': taskURL
  });

  Document.Mail(
  input, {
    'from': mailFrom,
    'message': emailTemplate,
    'subject': "Whatever",
    'HTML': true,
    'to': mailTo
  });

```

# Documentation Links

- [Registries](https://doc.nuxeo.com/n/u5c)
- [Task Editor](https://doc.nuxeo.com/n/yEo)
- [Email Templates](https://doc.nuxeo.com/n/UJM)
