function run(input, params) {
  var versions, numberOfVersions,i,currentDoc,versionCurrentDoc,myVersionToUpdate;
  versions = Document.GetVersions(
    input, {
    }
  );
  if(versions && versions.length){
    numberOfVersions = versions.length;
    for(i=0; i<numberOfVersions; i++){
      currentDoc = versions[i];
      versionCurrentDoc = currentDoc["uid:major_version"];
      myVersionToUpdate = params.versionToUpdate;
      Console.log("Document Title: "+currentDoc.title);
      Console.log("Document ID: "+currentDoc.id);
      Console.log("Document Version: "+versionCurrentDoc);
      if (versionCurrentDoc == myVersionToUpdate)
      {
        currentDoc = Document.FollowLifecycleTransition(
currentDoc, {
	/*required:true - type: string*/
	'value': 'approve'
}
);


return input;
      }
    }
  }
}
