# Designer Tips and Tricks

## Table Of Content

- [Get value from the parent document before creation](#get-value-from-the-parent-document-before-creation)
- [Override the global search to perform the search with fulltext analyzer on every property](#override-the-global-search-to-perform-the-search-with fulltext-analyzer-on-every-property)


## Prerequisites

- None

## Description

This module helps you to tune all backend aspects with Nuxeo Studio Modeler.  

## Usage

Adapt your Studio Modeler customization to fit your needs

## Studio Modeler Contributions

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

### Override the global search to perform the search with fulltext analyzer on every property

By default, it performs full text search only on `dc:title` property. To modify this behavior, create first a new page provider called `simple-fulltext` with the following query:

`ecm:mixinType != 'HiddenInNavigation' AND ecm:isCheckedInVersion = 0 AND ecm:currentLifeCycleState != 'deleted' AND ecm:fulltext LIKE '?'`

And uncheck escape quote parameter

The, you have to create a XML extension:

```
<extension point="suggesters" target="org.nuxeo.ecm.platform.suggestbox.service.SuggestionService">
    <suggester class="org.nuxeo.ecm.platform.suggestbox.service.suggesters.DocumentLookupSuggester" name="documentLookupByTitle">
      <parameters>
        <parameter name="providerName">simple-fulltext</parameter>
      </parameters>
    </suggester>
</extension>
```
