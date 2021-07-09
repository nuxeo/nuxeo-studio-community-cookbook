# better-html-to-pdf

Improved HTML-to-PDF Conversion

## Description

By default Nuxeo uses `any2pdf` for converting HTML BLOBs into PDF. Depending on the complexity of the HTML, the resulting PDF rendition may be substandard. The `wkhtmltopdf` tool generally does a better job for this kind of conversion and can easily be added to Nuxeo via simple contribution.

## Installation

You must of course install [wkhtmltopdf](https://wkhtmltopdf.org/). Follow the steps for your host operating system. Mac users can use [Homebrew](https://brew.sh/) (`brew install wkhtmltopdf`).

Add the following XML contribution in Studio > Modeler > Advanced Settings > XML Extensions:

    <!-- Define new command -->
    <extension point="command" target="org.nuxeo.ecm.platform.commandline.executor.service.CommandLineExecutorComponent">
      <command enabled="true" name="wkhtmltopdf">
        <commandLine>wkhtmltopdf</commandLine>
        <parameterString>-O #{orientation} -s #{pageSize} #{sourceFilePath} "#{targetFilePath}"</parameterString>
        <installationDirective>You need to install wkhtmltopdf.</installationDirective>
      </command>
    </extension>
    <!-- Define new converter -->
    <extension target="org.nuxeo.ecm.core.convert.service.ConversionServiceImpl"
      point="converter">
      <converter name="wkhtmltopdf"a
        class="org.nuxeo.ecm.platform.convert.plugins.CommandLineConverter">
        <sourceMimeType>text/html</sourceMimeType>
      <destinationMimeType>application/pdf</destinationMimeType>
        <parameters>
          <parameter name="CommandLineName">wkhtmltopdf</parameter>
        </parameters>
      </converter>
    </extension>

## Usage

Use the [`Blob.RunConverter`](https://explorer.nuxeo.com/nuxeo/site/distribution/latest/viewOperation/Blob.RunConverter) command to do the conversion. For example:

    myPDF = Blob.RunConverter(
      myHTML, {
      'converter': "wkhtmltopdf",
      'parameters': "targetFileName=" + input.title + "\norientation=Landscape\npageSize=A7"
    });

## Documentation Links

- [HOWTO: Contribute a Command Line Converter](https://doc.nuxeo.com/n/4SL)
