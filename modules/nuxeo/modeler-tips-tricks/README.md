# Modeler Tips and Tricks

## Table Of Content

- [Get value from the parent document before creation](#get-value-from-the-parent-document-before-creation)
- [Update the default behaviour of the Template Rendering Output](#update-the-default-behaviour-of-the-template-rendering-output-format)
- [Override the global search to perform the search with fulltext analyzer on every property](#override-the-global-search-to-perform-the-search-with-fulltext-analyzer-on-every-property)


## Prerequisites

- None

## Description

This module helps you to tune all backend aspects with Nuxeo Studio Modeler.  

## Usage

Adapt your Studio Modeler customization to fit your needs

## Studio Modeler Contributions

### Update the default behaviour of the Template Rendering Output Format

By default, the Template Rendering addon is ignoring the `Rendering Output Format` value and always generates PDFs. If you need to change it, create an automation scripting called `RenderPdf` (With `input=Document` and `output=Blob`) with the following content:

```
/* Replaces the default javascript.RenderPdf, as contribued by nuxeo-template-rendering, to
return a blob of the type defined in the template. */
function run(input, params) {

  var blob = TemplateProcessor.Render(input, {
    'templateName': params.templateName,
    'attach': params.attach || false,
    'templateData': params.templateData || null
  });

  return blob;
}
```

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

And uncheck "quote parameter"

Ignore the validation warning "Number of parameters and number of occurrences of the '?' character in the query filter do not match"

Then, you have to create an XML extension:

```
<extension point="suggesters" target="org.nuxeo.ecm.platform.suggestbox.service.SuggestionService">
    <suggester class="org.nuxeo.ecm.platform.suggestbox.service.suggesters.DocumentLookupSuggester" name="documentLookupByTitle">
      <parameters>
        <parameter name="providerName">simple-fulltext</parameter>
      </parameters>
    </suggester>
</extension>
```

## Documentation Links

- [Working in Studio Modeler](https://doc.nuxeo.com/studio/working-in-studio/)
- [Nuxeo Template Rendering Addon](https://doc.nuxeo.com/nxdoc/template-rendering-addon/)
