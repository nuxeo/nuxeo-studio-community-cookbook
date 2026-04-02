/* Return the configuraiton for the current user.

   IMPORTANT: We do want to create a UserHomeConfig document by default everytime a user logs in
   and does not have a configuration (Thking about customers with hundreds thousands of users).
   We create one only when they explicitely save a configuration (see HomePageConfiguration_SaveUserConfig)
*/
function run(input, params) {
  
  var nxql, docs, user, found, configJsonStr;
  
  user = currentUser.actingUser ? currentUser.actingUser : currentUser.name;
  
  nxql = "SELECT * FROM UserHomeConfig WHERE uhc:user = '" + user + "' ";
  nxql += " AND ecm:isVersion = 0 AND ecm:isTrashed = 0 AND ecm:isProxy = 0";
  
  Auth.LoginAs(null, {});
  
  docs = Repository.Query(null, {"query": nxql});
  found = docs.size();
  if(found === 0) {
    configJsonStr = JSON.stringify({
      column1: ['recentlyEdited', 'recentlyEdited'],
      column2: ['tasks', 'favorites']
    });
  } else {
    if(found > 1) {
      Console.warn("HomePageConfiguration_GetUserConfig: Found " + found + " documents. Should be 1.");
    }
    configJsonStr = docs[0]["uhc:configJson"];
  }
  
  Auth.Logout(null, {});
  
  return org.nuxeo.ecm.core.api.Blobs.createJSONBlob(configJsonStr);

}