# EML Previewer

![eml-previewer](eml-previewer.png)

## Prerequisites

This module needs external softwares to work correctly: The step-by-step instructions are specific to Linux based OS (Ubuntu in particular). It is probably possible to have the same software in Windows or other OS,  but it hasn't been tested.

## Description

This modules allows you to preview .eml files (with mimetype as `message/rfc822`).

## Usage

Upload an eml file in Web UI: It generates a PDF conversion, displayed within the Nuxeo PDF viewer.

:information_source: The original EML file is not deleted or updated (still stored in `file:content`): The module only displays another blob property corresponding to the PDF conversion.

## Installation


## Server

1. Install **xvfb** (X server with virtual framebuffer i.e. headless)

`sudo apt-get install xvfb`

2. Install **wkhtmltopdf** (requires an X server e.g. xvfb)

`sudo apt-get install wkhtmltopdf`

3. Create [script](https://github.com/JazzCore/python-pdfkit/wiki/Using-wkhtmltopdf-without-X-server) to run wkhtmltopdf with xvfb

- Create the `/usr/local/bin/wkhtmltopdf` file (create the missing directories if needed)

```
#!/bin/bash
xvfb-run -a --server-args="-screen 0, 1024x768x24" /usr/bin/wkhtmltopdf -q $*
```

- `sudo chmod +x /usr/local/bin/wkhtmltopdf`

4. Install **emailconverter**

- `cd /usr/local/bin/`
- `wget "https://github.com/nickrussler/eml-to-pdf-converter/releases/download/2.0.1/emailconverter-2.0.1-all.jar"`
- `chmod 755 emailconverter-2.0.1-all.jar`

5. Create a script to call emailconverter

- Create the `/usr/local/bin/eml2pdf.sh` file with:

```
#!/bin/sh -x

  LOG="/var/log/nuxeo/eml2pdf.log"
  echo "LOG = '${LOG}'" | tee -a "${LOG}"

  PWD=`pwd`
  echo "PWD = '${PWD}'" | tee -a "${LOG}"
  PWD=`realpath "${PWD}"`
  echo "PWD = '${PWD}'" | tee -a "${LOG}"

  BIN=`realpath "$0"`
  echo "BIN = '${BIN}'" | tee -a "${LOG}"

  DIR=`dirname "${BIN}"`
  echo "DIR = '${DIR}'" | tee -a "${LOG}"

  JAR="${DIR}/emailconverter-2.0.1-all.jar"
  echo "JAR = '${JAR}'" | tee -a "${LOG}"

  SOURCE="$1"
  echo "SOURCE = '${SOURCE}'" | tee -a "${LOG}"
  ls -l "${SOURCE}" | tee -a "${LOG}"

  TARGET="$2"
  echo "TARGET = '${TARGET}'" | tee -a "${LOG}"
  ls -l "${TARGET}" | tee -a "${LOG}"

  java -jar "${JAR}" -o "${TARGET}" "${SOURCE}" | tee -a "${LOG}"

  ls -l "${SOURCE}" | tee -a "${LOG}"
  ls -l "${TARGET}" | tee -a "${LOG}"
```

6. Reload your `PATH` or reboot your server to load the new libraries.

### Studio Modeler

- Create a blob property on the document type storing the eml file. For this example, we've created a new property on the default `File` document type, called `pdfconversion`, of type `blob`
  - Consequently, its XPATH is `file_schema:pdfconversion`
- Create the converter with a XML Contrib with the content of the `EML_TO_PDF.xml` file.
- Create an automation scripting with the content of `eml_to_pdf.js` file. It accepts `document` and provide a `document`.
- Create an event handler:
  - On Document Created or Imported
  - On the File Document Type
  - With custom EL Expression : `Document['file:content/mime-type'] == "message/rfc822"`

### Studio Designer

- Open the File view layout (`UI/document/file/nuxeo-file-view-layout.hml`)
- Substitute the line `<nuxeo-document-viewer role="widget" document="[[document]]"></nuxeo-document-viewer>` with

```
    <template is="dom-if" if="[[_isEmail(document)]]">
    <nuxeo-pdf-viewer style="height:600px" src="[[_url(document)]]"/>
    </template>

    <template is="dom-if" if="[[!_isEmail(document)]]">
    <nuxeo-document-viewer role="widget" document="[[document]]"></nuxeo-document-viewer>
    </template>
```

- Create the following methods in the Polymer section

```
_isEmail: function (document) {
      if (!document || !document.properties) {
        return undefined;
      }
      var extension = document.properties["file:content"]["mime-type"];
      if (extension === 'message/rfc822') {
        return true;
      } else {
        return false
      }
    },
    _url: function(){
      var baseUrl = this.$.nxcon.url;
      var id = this.get("document.uid");

      return baseUrl + '/nxfile/default/' + id + '/file_schema:pdfconversion';
    }
```

## Configuration

You can adapt this module:
- Create a new document rendition instead of storing the conversion in a blob property
- Execute the conversion on demand (from a button)
- ...

## Documentation Links

 - [URL for Files](https://doc.nuxeo.com/nxdoc/urls-for-files/)
 - [Nuxeo IMAP Connector](https://doc.nuxeo.com/userdoc/nuxeo-imap-connector/)
