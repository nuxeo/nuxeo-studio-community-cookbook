/* input: void
   output: blob
  
   Returns the configuration for the Product > Countries > Cities virtual tree.
*/
function run(input, params) {
  
  var config = {
    "resultLayout": "products-virtual-tree-results", // Must have been preloaded in the bundle
    "levels": [
      {
        "field": "product:type",
        "label": "Product",
        "ppParameter": "product_type"
      }, {
        "field": "company:country",
        "label": "Country",
        "ppParameter": "company_country"
      }, {
        "field": "company:city",
        "label": "City",
        "ppParameter":
        "company_city"
      }
    ]
  };
  
  return org.nuxeo.ecm.core.api.Blobs.createJSONBlob(JSON.stringify(config));
}