/* GetGoogleMapApiKey.js
   
   Returns the API key stored in nuxeo.conf.
   When called in a nuxeo-operation element in the UI, the value of the key
   if returned in theresponse.value (see nuxeo-geodistance-search.html)
*/
function run(input, params) {
  
  return Env["google.maps.api.key"];

}