# PDF / Word to HTML with pdf2htmlEX

Install one command line, declare it in XML, call `Blob.RunConverter`. The result is **one HTML file** with the
images, fonts and CSS embedded, so nothing is lost when Nuxeo keeps only the main blob. The layout matches the
original: fonts, positions, images, tables, headers/footers, columns. The text stays real text (searchable, copyable).

`pdftohtml` (`pdf2html`) and `soffice` (`office2html`) write the images as **separate files**, which Nuxeo returns
as extra blobs. Keep only the main blob and the images are gone. `office2html` can even return one of the images as
its main blob.

## 1. Install `pdf2htmlEX` in your Dockerfile

Paste [docker/Dockerfile.snippet](docker/Dockerfile.snippet) in your Dockerfile. If you are using our
[Nuxeo PresalesDocker](https://github.com/nuxeo-sandbox/nuxeo-presales-docker) tooling, paste it in the
`Things you want to run as root go here` section.

The block is long because pdf2htmlEX has no `dnf` package for Oracle Linux 9: it is compiled from source. It's
copy-paste, works on x86_64 and arm64, takes about 2 minutes, and is then cached. Word files go through the
LibreOffice already in the image.

### If you want to install it in your running docker without rebuilding the image (quick testing)

(lost when the container is re-created). Use the install-pdf2htmlex.sh script.

```bash
docker cp docker/install-pdf2htmlex.sh <container>:/tmp/
docker exec -u 0 <container> bash /tmp/install-pdf2htmlex.sh
docker cp nuxeo/pdf2htmlex-config.xml <container>:/opt/nuxeo/server/nxserver/config/
docker restart <container>
```

Don't paste the script's lines into a shell one by one. Run the script, which can safely be run again after a
failure.

## 2. XML

In Studio Modeler, create a new XML extension, and paste the content of [modeler/pdf2htmlex-config.xml](modeler/pdf2htmlex-config.xml).

This declares and makes available:
- the command `pdf2htmlEX`
- the converter `pdf2htmlEX`
- the converter `word2htmlEX`(It chains Nuxeo's standard `any2pdf` (LibreOffice) and `pdf2htmlEX`.)

> [!IMPORTANT]
> Keep the options `--tounicode 1 --decompose-ligature 1`. Without them, the HTML of PDFs made by Word or LibreOffice
> looks right, but its text is garbled (search, copy/paste).

## 3. Use

`Blob.RunConverter` takes a **blob** as input. From a document, get the file first (typically `file:content`).

| Input | Converter |
|---|---|
| PDF | `pdf2htmlEX` |
| doc, docx, odt, rtf | `word2htmlEX` |

```js
// Automation Scripting
var blob = input["file:content"];
var html = Blob.RunConverter(
  blob, {
    "converter": "word2htmlEX", // In this example we know the input is a Word document
    "parameters": "targetFileName=" + blob.getFilename() + ".html"
  });
```

Other more generic example:


```js
var pdfBlob = input["file:content"];
if(pdfBlob.getMimeType() !== "application/pdf") {
  pdfBlob = Blob.ToPdf(pdfBlob, {});
}
var html = Blob.RunConverter(
  pdfBlob, {
    "converter": "pdf2htmlEX",
    "parameters": "targetFileName=" + blob.getFilename() + ".html"
  });
.getMimeType() !== "application/pdf"))
```


The result is `text/html`, named after the source (`MyReport.docx` → `MyReport.html`).


## Good to know

- The HTML is a faithful **page rendering** (like a PDF in the browser), not an editable document. To display it in
  a UI, use an `<iframe>` or a new tab.
- Scanned PDFs stay images: no OCR.
- Fidelity for Word depends on the fonts installed on the server. Calibri, Cambria, Arial and Times compatible fonts
  are already in the image. Add your corporate fonts to `/usr/share/fonts` if needed.
- License: pdf2htmlEX is GPLv3 and free. It runs as an external program, so your code is not affected, and the
  generated HTML is yours.

`extras/` holds an earlier, more elaborate version: a wrapper script with options. It's not needed.
