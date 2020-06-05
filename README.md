<img src="nuxeo-logo.png" width="20%" align="right" />

# Nuxeo Studio Community Cookbook

This repository aims at helping the Nuxeo Community to enrich Nuxeo Studio projects. It provides a list of features and visual elements ready to be copy-pasted. The modules are for **LTS 2019**:

- They can be unrelated to the UI (to provide new backend features, such as utilities to handle multimedia files, specific conversions, email templates etc.).
- They can provide UI elements for Nuxeo Web UI, or any frontend application.

## Module listing

- [Latest Modules](#latest-modules)
- [Tips and Tricks](#tips-and-tricks)
- [Layouts](#layouts)
- [DAM](#dam)
- [AI](#ai)
- [Security / Authentication / User and Group Management](#security--authentication--user-and-group-management)
- [Reporting](#reporting)
- [Business Logics](#business-logics)
- [Templates](#templates)
- [Integrations](#integrations)

:information_source: Click on the module thumbnail to view the module contributions.

### Latest Modules

<table style="width:100%">
  <tr style="font-weight:bold">
    <th>Module</th>
    <th>Description</th>
    <th>Author</th>
    <th>Category</th>
  </tr>
  <tr>
    <td><a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/create-from-template"><img src="modules/nuxeo/create-from-template/CreateFromTemplate.png" width="120px"/></a></td>
    <td>Create from template</td>
    <td>Nuxeo</td>
    <td>Templates</td>
  </tr>
  <tr>
    <td><a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/geodistance-search-and-google-map"><img src="modules/nuxeo/geodistance-search-and-google-map/geodistance.png" width="120px"/></a></td>
    <td>Geodistance Search + Google Map</td>
    <td>Nuxeo</td>
    <td>Layouts, Search, Automation</td>
  </tr>
  <tr>
    <td><a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/send-email-from-webui"><img src="modules/nuxeo/send-email-from-webui/mail2.png" width="120px"/></a></td>
    <td>Send emails from Nuxeo Web UI</td>
    <td>Nuxeo</td>
    <td>Mail, Layouts, Automation, Templates</td>
  </tr>
  <tr>
    <td><a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/currency"><img src="modules/nuxeo/currency/currency2.jpg" width="120px"/></a></td>
    <td>Display a field with Currency format</td>
    <td>Nuxeo</td>
    <td>Layout</td>
  </tr>
</table>


### Tips and Tricks

<table width="100%">
  <tr style="font-weight:bold">
    <th>Module</th>
    <th>Description</th>
    <th>Author</th>
  </tr>
  <tr>
    <td><a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/modeler-tips-tricks"><img src="modules/nuxeo/modeler-tips-tricks/modeler.png" width="100px"/></a></td>
    <td>Tips and tricks to implement backend logics with Studio Modeler</td>
    <td>Nuxeo</td>
  </tr>
  <tr>
    <td><a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/designer-tips-tricks"><img src="modules/nuxeo/designer-tips-tricks/designer.png" width="100px"/></a></td>
    <td>Tips and tricks to design elements within Studio Designer</td>
    <td>Nuxeo</td>
  </tr>
  <tr>
    <td><a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/automation-script-utils"><img src="modules/nuxeo/automation-script-utils/script-utils-2.png" width="80px"/></a></td>
    <td>Automation Script Utilities</td>
    <td>Nuxeo</td>
  </tr>
</table>

### Layouts

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/geodistance-search-and-google-map"><img src="modules/nuxeo/geodistance-search-and-google-map/geodistance.png" width="120px"/></a> | Geodistance Search + Google Map | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/currency"><img src="modules/nuxeo/currency/currency2.jpg" width="120px"/></a> | Display a field with Currency format | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/cascading-fields"><img src="modules/nuxeo/cascading-fields/cascading.png" width="120px"/></a> | Cascading Fields in Document Layouts | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/highlight"><img src="modules/nuxeo/highlight/highlight-logo.png" width="120px"/></a> | Highlight in Custom Searches | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/eml-previewer"><img src="modules/nuxeo/eml-previewer/eml-previewer.png" width="120px"/></a> | Display EML Preview | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/progress-bar"><img src="modules/nuxeo/progress-bar/progress-bar.png" width="120px"/></a> | Add a progress bar | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/inject-html"><img src="modules/nuxeo/inject-html/html.jpeg" width="120px"/></a> | Inject HTML into a page using bound data | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/document-suggestion-result-formatters"><img src="modules/nuxeo/document-suggestion-result-formatters/suggestion-result-formatters.png" width="120px"/></a> | Custom Nuxeo Suggestion Display | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/collapse"><img src="modules/nuxeo/collapse/nuxeo-se-collapse.png" width="120px"/></a> | Collapsible Element | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/toggleable-form"><img src="modules/nuxeo/toggleable-form/screenshot.png" width="100px"/></a> | Inline card property Editing | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/salesforce-ui"><img src="modules/nuxeo/salesforce-ui/sfdc-webui.png" width="100px"/></a> | Display Salesforce metadata | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/ssn"><img src="modules/nuxeo/ssn/ssn.jpg" width="100px"/></a> | Show/hide the value of a secret field | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/related-documents"><img src="modules/nuxeo/related-documents/nuxeo-related-documents.png" width="150px"/></a> | Display Document Relations | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/barcode-widget"><img src="modules/nuxeo/barcode-widget/barcode-widget.png" width="150px"/></a> | Display text using barcode font | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/geodistance-search-and-google-map"><img src="modules/nuxeo/geodistance-search-and-google-map/geodistance.png" width="150px"/></a> | Geodistance Search + Google Map | Nuxeo

### DAM

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/video-thumbnail"><img src="modules/nuxeo/video-thumbnail/video-thumbnail2.png" width="100px"/></a> | Sets the video poster and search thumbnail | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/video-conversions"><img src="modules/nuxeo/video-conversions/movie.png" width="100px"/></a> | Additional video conversions | Nuxeo

### AI

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/google-vision-ocr"><img src="modules/nuxeo/google-vision-ocr/ocr.png" width="100px"/></a> | Extract text from an image-based PDF with Google Vision | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/sensitive-data"><img src="modules/nuxeo/sensitive-data/sensitive-data1.png" width="100px"/></a> | Display sensitive data details contained in a document | Nuxeo

### Security / Authentication / User and Group Management

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/bulk-workflow-reassignment"><img src="modules/nuxeo/bulk-workflow-reassignment/task_reassignment.png" width="100px"/></a> | Bulk Workflow Reassignment | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/saml-user-mapping"><img src="modules/nuxeo/saml-user-mapping/saml.png" width="100px"/></a> | Map SAML user attributes to Nuxeo | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/sensitive-data"><img src="modules/nuxeo/sensitive-data/sensitive-data1.png" width="100px"/></a> | Display sensitive data details contained in a document | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/ssn"><img src="modules/nuxeo/ssn/ssn.jpg" width="100px"/></a> | Show/hide the value of a secret field | Nuxeo

### Reporting

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/workflow-status"><img src="modules/nuxeo/workflow-status/workflow-status.png" width="100px"/></a> | Monitor workflow instances status | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/project-metrics"><img src="modules/nuxeo/project-metrics/kibana.png" width="100px"/></a> | Display Kibana dashboards in the "Analytics" menu | Nuxeo
<a href="https://github.com/nuxeo-sandbox/nuxeo-generic-dashboard-studio-template"><img src="modules/nuxeo/generic-dashboard/generic-dashboard.png" width="100px"/></a> | Generic Web UI Analytic Dashboards | Nuxeo

### Business Logics

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/comment-indexing"><img src="modules/nuxeo/comment-indexing/comments.png" width="100px"/></a> | Comment Indexing | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/send-email-from-webui"><img src="modules/nuxeo/send-email-from-webui/mail2.png" width="100px"/></a> | Send emails from Nuxeo Web UI | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/actions-versioned-documents"><img src="modules/nuxeo/actions-versioned-documents/document-versions.png" width="120px"/></a> | Delete and Update Document Lifecycle state of versioned documents | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/convert-date-to-timestamp"><img src="modules/nuxeo/convert-date-to-timestamp/calendar.png" width="100px"/></a> | Convert date to timestamp | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/related-documents"><img src="modules/nuxeo/related-documents/nuxeo-related-documents.png" width="150px"/></a> | Display Document Relations | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/delete-all-trashed-documents"><img src="modules/nuxeo/delete-all-trashed-documents/trash.png" width="80px"/></a> | Permanently delete all trashed documents | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/automation-script-utils"><img src="modules/nuxeo/automation-script-utils/script-utils-2.png" width="80px"/></a> | Automation Script Utilities | Nuxeo

### Templates

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/send-email-from-webui"><img src="modules/nuxeo/send-email-from-webui/mail2.png" width="100px"/></a> | Send emails from Nuxeo Web UI | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/email-templates-nuxeo"><img src="modules/nuxeo/email-templates-nuxeo/dark.png" width="100px"/></a> | Email templates | Nuxeo
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/tree/master/modules/nuxeo/create-from-template"><img src="modules/nuxeo/create-from-template/CreateFromTemplate.png" width="100px"/></a> | Document templates | Nuxeo

### Integrations

Module | Description | Contributor
--- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/modules/nuxeo/salesforce-ui"><img src="modules/nuxeo/salesforce-ui/sfdc-webui.png" width="100px"/></a> | Display Salesforce metadata | Nuxeo

## Getting Started

There is nothing to build. Each module generally contains:

- XML extension, page providers, automation chain or automation scripting into Nuxeo Studio Modeler.
- Layouts, contributions within the Nuxeo bundle file,  HTML resources, medias that should be created in Nuxeo Studio Designer.

You can clone the repository locally:

```
git clone https://github.com/nuxeo/nuxeo-studio-community-cookbook.git
```

### Prerequisites

A **Nuxeo Studio Account** as well as an **active Nuxeo Studio Project** is needed. You can create an account from our [registration page](https://connect.nuxeo.com/register/#/) and benefit from a free 30-day trial to get access to:

- Nuxeo Studio, the web-based configuration and customization environment
- Nuxeo Marketplace, the application store with ready-to-install plugins and packages

## Repository Structuration

Each new module should be created in a specific folder:

- `/modules/nuxeo`: Contributions from the Nuxeo Team, for demos, PoC or tests.
- `/modules/partners`: Contributions from the Nuxeo Partner Ecosystem.
- `/modules/community`: Contributions from the Nuxeo Community.

## Contributing

You have to follow the repository contribution [guidelines](toolkit-and-guidelines) when submitting a new addon:

- If you're a partner, create your partner folder under `/modules/partners/` if it doesn't exist already. Then, create the readme file to present your company and your contributions. We provide a [README-PARTNER.MD template](https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/toolkit-and-guidelines/README-PARTNER.md).
- Create a README file to present your module, using the [README-MODULE.MD template](https://github.com/nuxeo/nuxeo-studio-community-cookbook/blob/master/toolkit-and-guidelines/README-MODULE.md).
- Create a `/modeler` and `/designer` folders to upload respectively resources from Nuxeo Studio Modeler and Nuxeo Studio Designer.
- Upload your resources.
- Push your changes
  - If you're from Nuxeo, reference your addon in this page.
  - If not, you won't be allowed to push directly to master. Your pull request will be then checked by the Nuxeo Team before being published.
- Et voilà! :wink:

## Support

:warning: **These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Nuxeo Labs

You can access complete Nuxeo Marketplace addons on [Nuxeo Marketplace - Nuxeo Labs](https://connect.nuxeo.com/nuxeo/site/marketplace/category/nuxeo-labs) category (done for PoC and test purposes)

## Learn

- [Nuxeo Documentation](https://doc.nuxeo.com)
- [Nuxeo University](https://university.nuxeo.com)

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo

[Nuxeo](www.nuxeo.com), developer of the leading Content Services Platform, is reinventing enterprise content management (ECM) and digital asset management (DAM). Nuxeo is fundamentally changing how people work with data and content to realize new value from digital information. Its cloud-native platform has been deployed by large enterprises, mid-sized businesses and government agencies worldwide. Customers like Verizon, Electronic Arts, ABN Amro, and the Department of Defense have used Nuxeo's technology to transform the way they do business. Founded in 2008, the company is based in New York with offices across the United States, Europe, and Asia.

Learn more at www.nuxeo.com.
