# Comment Indexing

:warning: **This only applies to LTS2019 as comments are indexed in full text by default in LTS 2021. Please see https://jira.nuxeo.com/browse/NXP-26669 for details**

![comments](comments.png)

## Description

This module enables you to index the document comments.

## Usage

Comment a document and search for the comment author and the comment content.

## Installation

### Studio Modeler

- Create a schema called `commentsforindex`, with `cfi` as prefix.
  - Create the `comments` property, of type **Complex**, set as **multi-valued**:
    - Create a sub-field called `user` of type **User / Group**, with restriction to get **only users**
    - Create a sub-field called `comment` of type **String**
- Add the schema to the document type which comments should be indexed
- Declare a new core event in **Settings** > **Registries** > **Core Events** with the following code:

```json
{
  "events": {
    "commentAdded": "Comment Added",
    "commentRemoved": "Comment Removed"
  }
}
```
- Create an **automation scripting** called `AS_Comment_AddedOrRemoved` with the content of `Comment_AddedOrRemoved.js` (input: `void`, output: `void`).
- Add the `EH_AS_Comment_AddedOrRemoved` event handler to execute the automation scripting when a comment is added or removed:
  - Events: `Comment Added` and `Comment Removed`
  - No specific filters
  - Associated chain or script: `javascript.AS_Comment_AddedOrRemoved`
- Create a page provider to search for the `cfi:user` and `cfi:comment` property.

### Studio Designer

Create a search form, a result layout and a drawer item to display the search within Nuxeo Web UI.

## Issues and Limitations

It would be nice to update the Elasticsearch mapping to perform fulltext search on the comment content.

## Documentation Links

- [Nuxeo Comments](https://doc.nuxeo.com/nxdoc/comments/)
- [Nuxeo Elasticsearch Mapping](https://doc.nuxeo.com/nxdoc/configuring-the-elasticsearch-mapping/#making-ilike-work-case-insensitive-search)
