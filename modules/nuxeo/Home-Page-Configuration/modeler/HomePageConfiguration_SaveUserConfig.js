/* Create the UserHomeConfig config if it does not exist yet.

   --------------------------------------------------
   IMPORTANT
   --------------------------------------------------
   To avoid the risk of creating several "User Home Configurations" folder at root level,
   we strongly recomand to pre-create it once for all.
   It should have blocked inheritance so only admins can access it (Still, we Auth.Loginas()/Logout()
   when getting/creating a UserHomeConfig)

*/
function run(input, params) {
  
  var doc, configJson;
  
  configJson = params.configJson;
  
  Auth.LoginAs(null, {});
  
  doc = getUserDoc();
  doc["uhc:configJson"] = configJson;
  doc = Document.Save(doc, {});
  
  Auth.Logout(null, {});
  
  return org.nuxeo.ecm.core.api.Blobs.createJSONBlob('{"saveConfigStatus": "DONE"}');

}

// Create the doc if needed
function getUserDoc() {
  
  var user, nxql, docs, found, uhcDoc, root, container, configJson;
  
  user = currentUser.actingUser ? currentUser.actingUser : currentUser.name;
  
  nxql = "SELECT * FROM UserHomeConfig WHERE uhc:user = '" + user + "' ";
  nxql += " AND ecm:isVersion = 0 AND ecm:isTrashed = 0 AND ecm:isProxy = 0";
  
  docs = Repository.Query(null, {"query": nxql});
  found = docs.size();
  if(found === 0) {
    Console.log("HomePageConfiguration_Save: No UserHomeConfig found for " + user + ", creating one");
    if(!Fn.documentExists(Session, "/User Home Configurations")) {
      root = Repository.GetDocument(null, {'value': "/"});
      // We do have a little risk 2 users call this at the same time and we'll then have 2 User Home Configurations
      // This is to let room for improvment :-)
      // Best way to avoid that is to pre-create this User Home Configurations container.
      // Could also be done in Java, via CoreSession#getOrCreateDocument
      container = Document.Create(
        root, {
          'type': "Folder",
          'name': "User Home Configurations",
          'properties': {
            "dc:title": "User Home Configurations"
          }
        });
      // Only Admin
      container = Document.BlockPermissionInheritance(container, {});
      //Granting Everything permission on administrators
      container = Document.AddPermission(
        container, {
          permission: "Everything",
          username:  "administrators"
        }
      );
    } else {
      container = Repository.GetDocument(null, {'value': "/User Home Configurations"});
    }
    
    uhcDoc = Document.Create(
      container, {
        'type': "UserHomeConfig",
        'name': user,
        'properties': {
          "dc:title": user,
          "uhc:user": user
        }
      });
  } else {
    if(found > 1) {
      Console.warn("HomePageConfiguration_Save: Found " + found + " documents for user " + user + ". Should be 1.");
    }
    uhcDoc = docs[0];
  }
  
  return uhcDoc;
}