# Designer Tips and Tricks


## Prerequisites

- None

## Description

This module helps you to tune all backend aspects with Nuxeo Studio Modeler.  

## Usage

Adapt your Studio Modeler customization to fit your needs

## Studio Modeler

### Get value from the parent document before creation

It can be useful when executing property inheritage and `Document.CopySchema` automation operation.

Use this following automation scripting:

```
var parentPath;
 var eventCtx;

 if (ctx.Event) {
   eventCtx = ctx.Event.getContext();
   parentPath = eventCtx.getProperty("parentPath");
 }
 // Put here your business logic
 ```

 :warning: It doesn't work for files that are drag and dropped (document created with the file manager service).
