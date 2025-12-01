# About Nuxeo Studio Community Cookbook

This repository contains examples to help the Nuxeo Community enrich Nuxeo Studio projects. It provides various features and visual elements ready to be copy-pasted. Examples are included for Studio Modeler as well as Studio Designer.

# Repository Organization

* [modules/nuxeo](modules/nuxeo): Contributions from the Hyland Nuxeo Team.
* [modules/partners](modules/partners): Contributions from the Hyland Nuxeo Partner ecosystem.
* [toolkit-and-guidelines](toolkit-and-guidelines): these are template files for adding a new module.

# Prerequisites

A **Nuxeo Studio Account** as well as an **active Nuxeo Studio Project** are needed. You can create an account from our [registration page](https://connect.nuxeo.com/register/#/) and benefit from a free 30-day trial to get access to:

* Nuxeo Studio, the web-based configuration and customization environment
* Nuxeo Marketplace, the application store with ready-to-install plugins and packages

# Getting Started

There is nothing to build. Each module may contain:

* XML extension, page providers, automation chain or automation scripting into Nuxeo Studio Modeler.
* Layouts, contributions within the Nuxeo bundle file,  HTML resources, medias that should be created in Nuxeo Studio Designer.

These items are for copy/paste into Nuxeo Studio.

# Module listing

* [Latest Modules](#latest-modules)
* [Tips and Tricks](#tips-and-tricks)
* [Layouts](#layouts)
* [DAM](#dam)
* [AI](#ai)
* [Security / Authentication / User and Group Management](#security--authentication--user-and-group-management)
* [Reporting](#reporting)
* [Business Logics](#business-logics)
* [Templates](#templates)
* [Integrations](#integrations)

:information_source: Tip: you can click the thumbnail to view the module.

## Latest Modules

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/document-viewer-with-loading-message/01-Viewer-with-loading-message.png" width="120px"/>](modules/nuxeo/document-viewer-with-loading-message) | Document Viewer with "Loading..." Message | Hyland
[<img src="modules/nuxeo/carousel/README-Images/01-Carousel.png" width="120px"/>](modules/nuxeo/carousel) | Carousel | Hyland
[<img src="modules/nuxeo/virtual-tree/README-Images/overview.png" width="120px"/>](modules/nuxeo/virtual-tree) | Virtual Navigation | Hyland
[<img src="modules/nuxeo/nev-with-custom-blob-field/nev-with-custom-blob-field.png" width="120px"/>](modules/nuxeo/nev-with-custom-blob-field) | Nuxeo Enhanced Viewer with Custom Field | Hyland
[<img src="modules/nuxeo/replace-rendition/replace-rendition-1.png" width="120px"/>](modules/nuxeo/replace-rendition) | Replace Renditions | Hyland
[<img src="modules/nuxeo/select-all-bulk-action/export-bulk.png" width="120px"/>](modules/nuxeo/select-all-bulk-action) | Select All Documents and Send to Bulk Action from Search | Hyland
[<img src="modules/partners/genus/nev-viewer/screenshot.png" width="120px"/>](modules/partners/genus/nev-viewer) | Nuxeo Enhanced Viewer Document Preview | Genus


## Tips and Tricks

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/modeler-tips-tricks/modeler.png" width="100px"/>](modules/nuxeo/modeler-tips-tricks) | Tips and tricks to implement backend logics with Studio Modeler | Hyland
[<img src="modules/nuxeo/designer-tips-tricks/designer.png" width="100px"/>](modules/nuxeo/designer-tips-tricks) | Tips and tricks to design elements within Studio Designer | Hyland
[<img src="modules/nuxeo/automation-script-utils/script-utils-2.png" width="80px"/>](modules/nuxeo/automation-script-utils) | Automation Script Utilities | Hyland

## Layouts

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/carousel/README-Images/01-Carousel.png" width="120px"/>](modules/nuxeo/carousel) | Carousel | Hyland
[<img src="modules/nuxeo/virtual-tree/README-Images/overview.png" width="120px"/>](modules/nuxeo/virtual-tree) | Virtual Navigation | Hyland
[<img src="modules/nuxeo/document-viewer-with-loading-message/01-Viewer-with-loading-message.png" width="120px"/>](modules/nuxeo/document-viewer-with-loading-message) | Document Viewer with "Loading" Message | Hyland
[<img src="modules/nuxeo/parent-container-search/parent-container.png" width="120px"/>](modules/nuxeo/parent-container-search) | Search for Documents via their Parent Containers | Hyland
[<img src="modules/nuxeo/nev-with-custom-blob-field/nev-with-custom-blob-field.png" width="150px"/>](modules/nuxeo/nev-with-custom-blob-field) | Nuxeo Enhanced Viewer with Custom Field | Hyland
[<img src="modules/nuxeo/replace-rendition/replace-rendition-1.png" width="150px"/>](modules/nuxeo/replace-rendition) | Replace Renditions | Hyland
[<img src="modules/nuxeo/select-all-bulk-action/export-bulk.png" width="150px"/>](modules/nuxeo/select-all-bulk-action) | Select All Documents and Send to Bulk Action from Search | Hyland
[<img src="modules/partners/genus/nev-viewer/screenshot.png" width="120px"/>](modules/partners/genus/nev-viewer) | Nuxeo Enhanced Viewer Document Preview | Genus
[<img src="modules/nuxeo/document-load-and-preview/eye.png" width="120px"/>](modules/nuxeo/document-load-and-preview) | Document Load and Preview | Hyland
[<img src="modules/nuxeo/interactive-pdf-search/search-pdf-metadata.png" width="120px"/>](modules/nuxeo/interactive-pdf-search) | Interactive PDF Search | Hyland
[<img src="modules/nuxeo/custom-views/cookbook-custom-views2.png" width="120px"/>](modules/nuxeo/custom-views) | Custom Preview and Thumbnail | Hyland
[<img src="modules/nuxeo/color-search/color.png" width="120px"/>](modules/nuxeo/color-search) | Similar Color Search | Hyland
[<img src="modules/nuxeo/copy-move/copy-move.png" width="120px"/>](modules/nuxeo/copy-move) | Copy or move documents without the clipboard | Hyland
[<img src="modules/nuxeo/nuxeo-date-time-picker/nuxeo-date-time-picker2.png" width="120px"/>](modules/nuxeo/nuxeo-date-time-picker) | Date Time Picker | Hyland
[<img src="modules/nuxeo/geodistance-search-and-google-map/geodistance.png" width="120px"/>](modules/nuxeo/geodistance-search-and-google-map) | Geodistance Search + Google Map | Hyland
[<img src="modules/nuxeo/currency/currency2.jpg" width="120px"/>](modules/nuxeo/currency) | Display a field with Currency format | Hyland
[<img src="modules/nuxeo/qr-code/qrcode.png" width="120px"/>](modules/nuxeo/qr-code) | Create a QR Code | Hyland
[<img src="modules/nuxeo/cascading-fields/cascading.png" width="120px"/>](modules/nuxeo/cascading-fields) | Cascading Fields in Document Layouts | Hyland
[<img src="modules/nuxeo/highlight/highlight-logo.png" width="120px"/>](modules/nuxeo/highlight) | Highlight in Custom Searches | Hyland
[<img src="modules/nuxeo/eml-previewer/eml-previewer.png" width="120px"/>](modules/nuxeo/eml-previewer) | Display EML Preview | Hyland
[<img src="modules/nuxeo/progress-bar/progress-bar.png" width="120px"/>](modules/nuxeo/progress-bar) | Add a progress bar | Hyland
[<img src="modules/nuxeo/inject-html/html.jpeg" width="120px"/>](modules/nuxeo/inject-html) | Inject HTML into a page using bound data | Hyland
[<img src="modules/nuxeo/document-suggestion-result-formatters/suggestion-result-formatters.png" width="120px"/>](modules/nuxeo/document-suggestion-result-formatters) | Custom Nuxeo Suggestion Display | Hyland
[<img src="modules/nuxeo/collapse/nuxeo-se-collapse.png" width="120px"/>](modules/nuxeo/collapse) | Collapsible Element | Hyland
[<img src="modules/nuxeo/toggleable-form/screenshot.png" width="100px"/>](modules/nuxeo/toggleable-form) | Inline card property Editing | Hyland
[<img src="modules/nuxeo/salesforce-ui/sfdc-webui.png" width="100px"/>](modules/nuxeo/salesforce-ui) | Display Salesforce metadata | Hyland
[<img src="modules/nuxeo/ssn/ssn.jpg" width="100px"/>](modules/nuxeo/ssn) | Show/hide the value of a secret field | Hyland
[<img src="modules/nuxeo/related-documents/nuxeo-related-documents.png" width="150px"/>](modules/nuxeo/related-documents) | Display Document Relations | Hyland
[<img src="modules/nuxeo/barcode-widget/barcode-widget.png" width="150px"/>](modules/nuxeo/barcode-widget) | Display text using barcode font | Hyland
[<img src="modules/nuxeo/geodistance-search-and-google-map/geodistance.png" width="150px"/>](modules/nuxeo/geodistance-search-and-google-map) | Geodistance Search + Google Map | Hyland
[<img src="modules/nuxeo/eml-previewer/eml-previewer.png" width="150px"/>](modules/nuxeo/document-load-and-preview) | Preview related documents | Hyland
[<img src="modules/nuxeo/replace-rendition/replace-rendition-1.png" width="150px"/>](modules/nuxeo/replace-rendition) | Replace Picture and Video Renditions | Hyland

## DAM

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/color-search/color.png" width="120px"/>](modules/nuxeo/color-search) | Similar Color Search | Hyland
[<img src="modules/nuxeo/video-thumbnail/video-thumbnail2.png" width="100px"/>](modules/nuxeo/video-thumbnail) | Sets the video poster and search thumbnail | Hyland
[<img src="modules/nuxeo/video-conversions/movie.png" width="100px"/>](modules/nuxeo/video-conversions) | Additional video conversions | Hyland

## AI

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/color-search/color.png" width="120px"/>](modules/nuxeo/color-search) | Similar Color Search | Hyland
[<img src="modules/nuxeo/google-vision-ocr/ocr.png" width="100px"/>](modules/nuxeo/google-vision-ocr) | Extract text from an image-based PDF with Google Vision | Hyland
[<img src="modules/nuxeo/sensitive-data/sensitive-data1.png" width="100px"/>](modules/nuxeo/sensitive-data) | Display sensitive data details contained in a document | Hyland

## Security / Authentication / User and Group Management

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/user-group-management/user-group-management.png" width="100px"/>](modules/nuxeo/user-group-management) | Local Group Administrators | Hyland
[<img src="modules/nuxeo/bulk-workflow-reassignment/task_reassignment.png" width="100px"/>](modules/nuxeo/bulk-workflow-reassignment) | Bulk Workflow Reassignment | Hyland
[<img src="modules/nuxeo/saml-user-mapping/saml.png" width="100px"/>](modules/nuxeo/saml-user-mapping) | Map SAML user attributes to Nuxeo | Hyland
[<img src="modules/nuxeo/sensitive-data/sensitive-data1.png" width="100px"/>](modules/nuxeo/sensitive-data) | Display sensitive data details contained in a document | Hyland
[<img src="modules/nuxeo/ssn/ssn.jpg" width="100px"/>](modules/nuxeo/ssn) | Show/hide the value of a secret field | Hyland

## Reporting

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/workflow-status/workflow-status.png" width="100px"/>](modules/nuxeo/workflow-status) | Monitor workflow instances status | Hyland
[<img src="modules/nuxeo/project-metrics/kibana.png" width="100px"/>](modules/nuxeo/project-metrics) | Display Kibana dashboards in the "Analytics" menu | Hyland
[<img src="modules/nuxeo/generic-dashboard/generic-dashboard.png" width="100px"/>](https://github.com/nuxeo-sandbox/nuxeo-generic-dashboard-studio-template) | Generic Web UI Analytic Dashboards | Hyland

## Business Logics

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/nuxeo-operation-button-with-navigation/navigation.png" width="50px"/>](modules/nuxeo/nuxeo-operation-button-with-navigation) | Nuxeo Operation Button with Navigation | Hyland
[<img src="modules/nuxeo/comment-indexing/comments.png" width="100px"/>](modules/nuxeo/comment-indexing) | Comment Indexing (:warning: only LTS2019) | Hyland
[<img src="modules/nuxeo/send-email-from-webui/mail2.png" width="100px"/>](modules/nuxeo/send-email-from-webui) | Send emails from Nuxeo Web UI | Hyland
[<img src="modules/nuxeo/actions-versioned-documents/document-versions.png" width="120px"/>](modules/nuxeo/actions-versioned-documents) | Delete and Update Document Lifecycle state of versioned documents | Hyland
[<img src="modules/nuxeo/convert-date-to-timestamp/calendar.png" width="100px"/>](modules/nuxeo/convert-date-to-timestamp) | Convert date to timestamp | Hyland
[<img src="modules/nuxeo/related-documents/nuxeo-related-documents.png" width="150px"/>](modules/nuxeo/related-documents) | Display Document Relations | Hyland
[<img src="modules/nuxeo/delete-all-trashed-documents/trash.png" width="80px"/>](modules/nuxeo/delete-all-trashed-documents) | Permanently delete all trashed documents | Hyland
[<img src="modules/nuxeo/automation-script-utils/script-utils-2.png" width="80px"/>](modules/nuxeo/automation-script-utils) | Automation Script Utilities | Hyland

## Templates

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/send-email-from-webui/mail2.png" width="100px"/>](modules/nuxeo/send-email-from-webui) | Send emails from Nuxeo Web UI | Hyland
[<img src="modules/nuxeo/email-templates-nuxeo/dark.png" width="100px"/>](modules/nuxeo/email-templates-nuxeo) | Email templates | Hyland
[<img src="modules/nuxeo/create-from-template/CreateFromTemplate.png" width="100px"/>](modules/nuxeo/create-from-template) | Document templates | Hyland

## Integrations

Module | Description | Contributor
--- | --- | ---
[<img src="modules/nuxeo/salesforce-ui/sfdc-webui.png" width="100px"/>](modules/nuxeo/salesforce-ui) | Display Salesforce metadata | Hyland

# Contributing

You have to follow the repository contribution [guidelines](toolkit-and-guidelines) when submitting a new addon:

* If you're a partner, create your partner folder under `/modules/partners/` if it doesn't exist already. Then, create the readme file to present your company and your contributions. We provide a [README-PARTNER.MD template](https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/toolkit-and-guidelines/README-PARTNER.md).
* Create a README file to present your module, using the [README-MODULE.MD template](https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/toolkit-and-guidelines/README-MODULE.md).
* Create a `/modeler` and `/designer` folders to upload respectively resources from Nuxeo Studio Modeler and Nuxeo Studio Designer.
* Upload your resources.
* Push your changes
* Et voilà! :wink:

# Learn

* [Nuxeo Documentation](https://doc.nuxeo.com)
* [Nuxeo Training](https://university.hyland.com/pages/nuxeo)

# Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

# License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

# About Nuxeo

Nuxeo Platform is an open source Content Services platform, written in Java. Data can be stored in both SQL & NoSQL databases.

The development of the Nuxeo Platform is mostly done by Hyland employees with an open development model.

The source code, documentation, roadmap, issue tracker, testing, benchmarks are all public.

Typically, Nuxeo users build different types of information management solutions for [document management](https://www.nuxeo.com/solutions/document-management/), [case management](https://www.nuxeo.com/solutions/case-management/), and [digital asset management](https://www.nuxeo.com/solutions/dam-digital-asset-management/), use cases. It uses schema-flexible metadata & content models that allows content to be repurposed to fulfill future use cases.

More information is available at [www.nuxeo.com](https://www.nuxeo.com).
