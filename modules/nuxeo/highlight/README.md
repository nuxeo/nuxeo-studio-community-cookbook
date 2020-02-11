# Search with result highlight

![highlight](highlight.png)

## Prerequisites

- Nuxeo Web UI installed

## Description

This tutorial helps you configure a custom search with the **List View** result layout with the Nuxeo highlight.

## Usage

Perform a fulltext search on your custom search and see highlighted terms

## Installation

### Studio Modeler

- Ensure you have configure the `ecm:fulltext` predicate with the `FULLTEXT` operator in your page provider.

### Studio Designer

- Generate your custom search from and adapt the element for your fulltext search with

```    
<!-- Full text highlights - Predicate -->
<nuxeo-input autofocus="" id="searchInput" label="[[i18n('defaultSearch.fullText')]]" on-keydown="_checkForEnter" placeholder="[[i18n('defaultSearch.fullText.placeholder')]]" role="widget" type="search" value="{{searchTerm}}">
</nuxeo-input>
```

- Then, on the script part, add a new property:

```
searchTerm: {
        type: String,
        notify: true
      }
```

- Add the following methods:

```
      /**
         * @Full text Highlights
         */
      searchTerm: {
        type: String,
        notify: true
      }
    },

    /**
    * @Full text Highlights
    */
    clear: function() {
      this.searchTerm = '';
      this._search();
    },

    /**
    * @Full text Highlights
    */

    _checkForEnter: function(e) {
      if (e.keyCode === 13) {
        this._search();
      }
    },
    /**
    * @Full text Highlights
    */
    _search: function() {
      if (this.searchTerm) {
        //      this.set('params.system_fulltext', this.formatFulltext(this.searchTerm));
        this.set('params.system_fulltext', this.searchTerm);
        this.set('params.highlight',
                 'dc:title.fulltext,ecm:binarytext,ecm:binarytext.common,dc:description.common,dc:description.fulltext,nxtag:tags.label,note:note.fulltext,file:content.name');
      } else if (this.params.system_fulltext) {
        this.set('params.system_fulltext', '');
        delete this.params.system_fulltext;
        delete this.params.highlight;
      }

    }
```

- Finally, on the Search Drawer Item, don't forget to add `highlight` to the enricher list.

## Documentation

- [HOWTO: Configure Searches](https://doc.nuxeo.com/nxdoc/web-ui-search/)
