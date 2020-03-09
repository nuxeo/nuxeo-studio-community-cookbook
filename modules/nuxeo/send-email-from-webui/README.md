# Send emails from Nuxeo Web UI

![demo-email](demo-email.gif)

## Prerequisites

- Configure your email configuration to allow Nuxeo Platform to send email
- For test purposes on a local environment, you can use fakeSMTP as proxy SMTP server. Check this [post on aswers.nuxeo.com](https://answers.nuxeo.com/general/q/8ab0a80dead74dc496589244b7984548/How-can-I-setup-a-SMTP-server)

## Description

This cookbook recipe allows you to send emails directly from Nuxeo Web UI. The user navigates to a document and get the ability to:
- Either send an email as "Internal", with a link to access the document
- Or send an email as "External", with the current document in the email attachment

The contributions are prepared so that:
- The user gets a dialog to write a subject, recipients and a mail body
- The permissions are updated to give READ access to the recipients (if internal)
- The email which was sent is stored in the document attachments
- The email is tracked in the audits

## Usage

Navigate to a document and send your email from the document metadata for example.

## Installation

### Studio Modeler

- Create a **Document Template**, called `Mail_Template` with the content of the code in the `modeler` folder.
- Create the two automation scripting listed in the same `modeler` folder.
  - `Input` and `Output` is `Document`
  - Parameters are `subject`, `to`, `body` 
- Upload NUXEO-LOGO-1.png in Resources > Images

### Studio Designer

Add this section to your document type metadata layout:

```html
<nuxeo-connection id="cnx" user="{{currentUser}}"></nuxeo-connection>
    <nuxeo-operation id="AS_SendMail_Internal" op="javascript.AS_SendMail_Internal" input="[[document]]" params="[[params]]">   
    </nuxeo-operation>
    <nuxeo-operation id="AS_SendMail_External" op="javascript.AS_SendMail_External" input="[[document]]" params="[[params]]">   
    </nuxeo-operation>
    <paper-toast id="toast"></paper-toast>
    <div style="margin-top: 20px;margin-bottom: 20px;background-color: #F2F2F2;">
      <b>ACTIONS</b>
    </div>


    <nuxeo-dialog reparent="" id="popupInternal" modal="" no-auto-focus="">
      <h2>Compose your email  for <b>internal</b> users</h2>
      <nuxeo-input role="widget" label="Subject" name="subject" value="{{subject}}"></nuxeo-input>
      <nuxeo-user-suggestion min-chars="0" role="widget" label="To" value="{{to}}" search-type="USER_TYPE" multiple=""></nuxeo-user-suggestion>
      <nuxeo-textarea role="widget" label="Body" name="body" value="{{body}}" rows="3"></nuxeo-textarea>
      <div class="buttons">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button dialog-confirm="" class="primary" on-tap="doChangeInternal">Send email</paper-button>
      </div>
    </nuxeo-dialog>


    <nuxeo-dialog reparent="" id="popupExternal" modal="" no-auto-focus="">
      <h2>Compose your email  for <b>external</b> users</h2>
      <nuxeo-input role="widget" label="Subject" name="subject" value="{{subject}}"></nuxeo-input>
      <nuxeo-user-suggestion min-chars="0" role="widget" label="To" value="{{to}}" search-type="USER_TYPE" multiple=""></nuxeo-user-suggestion>
      <nuxeo-textarea role="widget" label="Body" name="body" value="{{body}}" rows="3"></nuxeo-textarea>
      <div class="buttons">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button dialog-confirm="" class="primary" on-tap="doChangeExternal">Send email</paper-button>
      </div>
    </nuxeo-dialog>


    <paper-icon-button id="btn" icon="icons:mail" on-tap="_notifInternal">
    </paper-icon-button>EMAIL THIS DOCUMENT FOR INTERNALS (LINK)<br/>
    <paper-icon-button id="btn" icon="icons:attachment" on-tap="_notifExternal">
    </paper-icon-button>EMAIL THIS DOCUMENT FOR EXTERNALS (ATTACHMENT)
```

On the same page, add `params` to the properties in the Polymer section:

```js
params: {
       type: Object,
       value: {}
     }
```

Finally add these functions:

```js

    _notifInternal: function() {
      this.$.popupInternal.toggle();
    },
    _notifExternal: function() {
      this.$.popupExternal.toggle();
    },

    _toast: function(text) {
      this.$.toast.hide();
      this.$.toast.text = text;
      this.$.toast.open();
    },

    doChangeExternal: function () {
      this.params.body = this.body;
      this.params.subject = this.subject;
      this.params.to = this.to;
      this.params.from = this.$.cnx.user.properties.email;
      this.params.from_name = this.$.cnx.user.id;
      this.$.AS_SendMail_External.execute().then(function(result) {
        this._toast("Email for external users sent");
        location.reload();
      }.bind(this))
        .catch(function(error) {
        alert("Error:\n" + error);
      }.bind(this))},

    doChangeInternal: function () {
      this.params.body = this.body;
      this.params.subject = this.subject;
      this.params.to = this.to;
      this.params.from = this.$.cnx.user.properties.email;
      this.params.from_name = this.$.cnx.user.id;
      this.$.AS_SendMail_Internal.execute().then(function(result) {
        this._toast("Email for internal users sent");
        location.reload();
      }.bind(this))
        .catch(function(error) {
        alert("Error:\n" + error);
      }.bind(this))}
```

## Configuration

- By default, the document body is stored in `dc:source`.
- It is useful to apply group restrictions for the internal and external nuxeo user suggestion.

## Documentation Links

- [Set Up Email Notification](https://doc.nuxeo.com/nxdoc/set-up-email-notification/)
- [Nuxeo IMAP Connector](https://doc.nuxeo.com/userdoc/nuxeo-imap-connector/)
