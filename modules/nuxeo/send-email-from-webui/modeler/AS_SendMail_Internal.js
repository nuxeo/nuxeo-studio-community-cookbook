function run(input, params) {
  var i;
  var today = CurrentDate.format('yyyy-MM-dd');
  var email_sent;
  var to = params.to;
  var from = currentUser.email;
  var from_name = currentUser.name;
  var newto = [];
  var to_with_commas="";

  Auth.LoginAs(
input, {
	'name': "Administrator"
}
);

  if(to && to.length){
    var numberOfto = to.length;
    newto.push(from);
    for(i=0; i<numberOfto; i++){
      var currentto = to[i];
      to_with_commas = to_with_commas+currentto+" ";
      currentto = Fn.getEmail(currentto);
      newto.push(currentto);
    }
  }
  var subject = params.subject;
  var body = params.body;

  Document.Mail(
    input, {
      'from': from,
      'message': "<html>\n\n<body style=\"margin:0; font-family: Arial,Helvetica,sans-serif;\">\n  <div style=\"background: #cecece;height: 100%\">\n    <center>\n      <div style=\"width:600px; display: inline-block; margin: 10px; background: #ffffff; box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\">\n        <table align=\"center\"\n            width=\"500\">\n          <tr>\n            <td align=\"center\"\n                style=\"padding-top: 100px; padding-bottom: 50px;\">\n\n<#if (Runtime.getProperty('nuxeo.url')?index_of(\"localhost:8080\")) gt -1>\n              <img width=\"100\" src=\"https://d1q6f0aelx0por.cloudfront.net/product-logos/library-nuxeo-logo.png\" />\n<#else>\n              <img width=\"100\" src=\"${Runtime.getProperty('nuxeo.url')}/img/NUXEO-LOGO-1.png\" />\n</#if>\n            </td>\n          </tr>\n          <tr>\n            <td align=\"center\"\n                style=\"padding-bottom: 30px;\">\n              <span style=\"font-weight: bold; font-size: x-large; color: #000000\">Document Share</span>\n            </td>\n          </tr>\n          <tr>\n            <td align=\"csenter\"\n                style=\"padding-bottom: 50px; font-size: larger; color: #808080; text-align: justify;\">"+body+"</td>\n          </tr>\n          <tr>\n            <td align=\"center\"\n                style=\"padding-bottom: 50px;\">\n              <a style=\"background:#1B6BF6; color: #fff;text-shadow: 1px 1px 2px #333333; text-decoration: none; border-radius: 5px;padding: 12px 24px;text-align: center; display: inline-block;\"\n                  href=\"${docUrl}\">VIEW DOCUMENT</a>\n            </td>\n          </tr>\n          <tr>\n<tr>\n            <td style=\"padding-bottom: 100px;\">\n            </td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n    </center>\n  </div>\n</body>\n\n</html>",
      'subject': subject,
      'HTML': "true",
      'to': newto,}
  );
  input = Document.AddPermission(
input, {
	'permission': "Read",
	'users': to,
}
);

  input = Audit.LogEvent(
input, {
	'event': "Internal Email Sent",
	'category': "Email",
  'comment': "Sender: "+from_name+" and Recipients: "+to_with_commas
}
);

  input = Document.SetProperty(
input, {
	'xpath': "dc:source",
	'save': "true",
	'value': body
}
);

 email_sent = Render.Document(
   input, {
     'template': "template:Mail_Template",
     'filename': subject+"-"+today+".eml",
     'mimetype': "text/html",
     'type':"ftl"
   }
 );

  email_sent = Blob.AttachOnDocument(
email_sent, {
	'document': input,
	'save': "true",
	'xpath': "files:files"
}
);


  Auth.Logout(
input, {
}
);

  return input;

}
