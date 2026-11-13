# PDF / Word to HTML with pdf2htmlEX

#### • The Potential Issue

When converting to HTML, Nuxeo's standard converters (`pdf2html` and `office2html`), the `soffice` or `pdftohtml`
command lines write the images as separate files, which Nuxeo returns as extra blobs, so the result does not
contain the images (`office2html` can even return one of the images as its main blob).

#### • The Solution

If you need a good conversion where all the content is embedded in the HTML, then:

  * Install `pdf2htmlEX` command-line tool
  * Declare it in XML
  * Call `Blob.RunConverter`

=> The result is one HTML file with the images, fonts and CSS embedded, so nothing is lost. The layout matches the
original: fonts, positions, images, tables, headers/footers, columns. The text stays real text (searchable, copyable).

> [!IMPORTANT]
> The generated HTML is a page rendering (like a PDF in the browser) => see [Display/Edit the HTML](#display-edit-the-html)

## 1. Install `pdf2htmlEX` in your Dockerfile

Paste [docker/Dockerfile.snippet](docker/Dockerfile.snippet) in your Dockerfile. If you are using our
[Nuxeo Presales Docker](https://github.com/nuxeo-sandbox/nuxeo-presales-docker) tooling, paste it in the
`Things you want to run as root go here` section.

The block is long because pdf2htmlEX has no `dnf` package for Oracle Linux 9: it is compiled from source. It's
copy-paste, works on x86_64 and arm64, takes about 2 minutes, and is then cached. Word files go through the
LibreOffice already in the image.

### Quick test: install in a running container

Use [docker/install-pdf2htmlex.sh](docker/install-pdf2htmlex.sh) to install without rebuilding the image (lost when
the container is re-created). From this module's folder:

```bash
docker cp docker/install-pdf2htmlex.sh <container>:/tmp/
docker exec -u 0 <container> bash /tmp/install-pdf2htmlex.sh
docker restart <container>
```

Don't paste the script's lines into a shell one by one. Run the script, which can safely be run again after a
failure.

Then add the XML to your Studio project (step 2).

## 2. XML

In Studio Modeler, create a new XML extension, and paste the content of [modeler/pdf2htmlex-config.xml](modeler/pdf2htmlex-config.xml).

This declares and makes available:
- the command `pdf2htmlEX`
- the converter `pdf2htmlEX`
- the converter `word2htmlEX`, which chains Nuxeo's standard `any2pdf` (LibreOffice) and `pdf2htmlEX`

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
// Automation Scripting. The input document holds a Word file
var blob = input["file:content"];
var html = Blob.RunConverter(blob, {"converter": "word2htmlEX"});
```

Any file LibreOffice can open: convert it to PDF first.

```js
var blob = input["file:content"];
if (blob.getMimeType() !== "application/pdf") {
  blob = Blob.ToPDF(blob, {});
}
var html = Blob.RunConverter(blob, {"converter": "pdf2htmlEX"});
```

The result is `text/html`, named after the source (`MyReport.docx` → `MyReport.html`).

## Display/Edit the HTML

The generated HTML is an HTML that is *rendered* (aka streamed) by the browser. This means:

* It can be downloaded and opened in a browser (user downloads and double-cliks)
* Editing is possible but that's not what it is made for. You can open it in a text editor, but it is a
  rendering of the pages, like a PDF in a browser, not a document. So for example, fixing a typo with the same
  number of characters works, but any change a bit bigger may break the rendition.
* To display it in a browser tab or an `<iframe>` in Web UI, you must open the file URL with `?inline=true`
  (or `&inline=true`)

## Good to know

- Scanned PDFs stay images: no OCR.
- Fidelity for Word depends on the fonts installed on the server. Arial, Times and Courier compatible fonts
  (Liberation) and a Calibri compatible font (Carlito) are installed by the snippet. A Cambria compatible font
  (Caladea) comes with the image's LibreOffice, which is enough for Word files. Add your corporate fonts to
  `/usr/share/fonts` if needed.

## License

**`pdf2htmlEX` is GPLv3** and free. It runs as an external program, so your code is not affected, and the
  generated HTML is yours.
