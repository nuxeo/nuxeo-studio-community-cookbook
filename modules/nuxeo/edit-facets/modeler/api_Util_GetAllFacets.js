/*
Get a list of all facets defined in the current application.
Requires Java Objects in Automation Scripting
https://doc.nuxeo.com/nxdoc/automation-scripting/#java-objects-in-automation-scripting
*/
function run(input, params) {

  // Requires contrib to `classFilter` endpoint to allow these classes.
  var Framework = org.nuxeo.runtime.api.Framework;
  var SchemaManager = org.nuxeo.ecm.core.schema.SchemaManager;

  var schemaManagerInstance = Framework.getService(SchemaManager.class);
  // This is a CompositeType[]
  // cf. https://community.nuxeo.com/api/nuxeo/latest/javadoc/org/nuxeo/ecm/core/schema/TypeProvider.html#getFacets()
  var facets = schemaManagerInstance.getFacets();

  var facetNames = [];

  for (var i = 0; i < facets.length; i++) {
    // I never realized but Nuxeo creates a facet for every workflow task; I don't think we want those...
    // TODO: we may want more generic filtering, or perhaps the ability to pass a filter as a param.
    var facet = facets[i];
    var facetName = facet.name;
    // Ignore facets prefixed with "facet-var_"
    if (facetName.indexOf("facet-var_") === -1) {
      facetNames.push(facetName);
    }
  }

  return facetNames;
}
