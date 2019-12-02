/* https://doc.nuxeo.com/nxdoc/comments
      > All events shared the same event context. It contains:

      > the parent document in parentComment
      > the commented document in comment_document
      > the comment text in comment
      > the category commentCategory in category

   Handling only documents with the "Asset" facet (so, adding the comment-thread to
   a WF task is not handled here, since a Task document does not have the commentforindex schema)
   ********** NOT PRODUCTION READY **********
   For one, indexing of comments is comming "soon"
   Then , this algorythm is good when _adding_  acomment, not perfect when
   _removing_ a comment. Some comments may not be removed from the field,
   but all this is OK for demo mode
*/
function run(input, params) {

  var eventName, docModel, doc, pcipal, pcipalName, pcipalFullName,
      comment, comments, oneComment, newComments, i;

  Console.log("Comment_AddedOrRemoved");

  eventName = ctx.Event.name;
  switch(eventName) {
    case "commentAdded":
    case "commentRemoved":
      break;
    default:
      Console.warn("  Event received: " + eventName + " => not commentAdded or commentRemoved => Ignoring the event.");
      return;
  }

  docModel = ctx.Event.context.getProperty("parentComment");
  if(!docModel.hasSchema("commentsforindex")) {
    Console.log("Comments won't be indexed for this document because it doesn't have the commentsforindex attached");
    return;
  }
  comment = ctx.Event.context.getProperty("comment");
  pcipal = ctx.Event.context.getPrincipal();
  if(pcipal) {
    pcipalName = pcipal.getName();
  } else {
    pcipalName = null;
  }

  Auth.LoginAs(null, {});
  // Let's do it in JS
  doc = Repository.GetDocument(null, {'value': docModel.getId()});
  switch(eventName) {
    case "commentAdded":
      Console.log("  commentAdded");
      oneComment = [{ // Document.AddItemToListProperty is expecting an _array_ of object, stringified.
        'user': pcipalName,
        "comment": comment
      }];
      doc = Document.AddItemToListProperty(
        doc, {
          'complexJsonProperties': JSON.stringify(oneComment),
          'xpath': "cfi:comments",
          'save': true
        }
      );
      break;

    case "commentRemoved":
      Console.log("  commentRemoved");
      comments = doc["cfi:comments"];
      newComments = [];
      for(i = 0; i < comments.length; i++) {
        oneComment = comments[i];
        if(oneComment.user !== pcipalName || oneComment.comment !== comment) {
          newComments.push(oneComment);
        }
      }
      doc["cfi:comments"] = newComments;
      doc = Document.Save(doc, {});
      break;
  }

  Auth.Logout(null, {});
}
