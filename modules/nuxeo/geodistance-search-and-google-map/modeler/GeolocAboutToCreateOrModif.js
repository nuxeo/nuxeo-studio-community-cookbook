/* GeolocAboutToCreateOrModif
   Concatenate latitude and longitude to the geoloc:location field
   Called in "about to create" or "before document modification" => not saving the document.
*/
function run(input, params) {
  
  var lat, long;

  if(!input.doc.getProperty("geoloc:latitude").isDirty() && !input.doc.getProperty("geoloc:longitude").isDirty()) {
    //Console.log("Lat/long not dirty => doing nothing");
    return input;
  }
  
  lat = input["geoloc:latitude"];
  long = input["geoloc:longitude"];
  
  if(lat && long) {
    input["geoloc:location"] = "" + lat + "," + long;
  } else {
    input["geoloc:location"] = null;
  }
  
  return input;
}