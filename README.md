<img src="nuxeo-logo.png" width="20%" align="right" />

# Nuxeo Studio Community Cookbook

This repository aims at helping the Nuxeo Community to enrich Nuxeo Studio projects. It provides a list of features and visual elements ready to be copy-pasted. The modules are for **LTS 2019**:

- They can be unrelated to the UI (to provide new backend features, such as utilities to handle multimedia files, specific conversions, email templates etc.).
- They can provide UI elements for Nuxeo Web UI, or any frontend application.

## Module listing

:information_source: Click on the module thumbnail to view the module contributions.

Module | Description | Contributor | Category
--- | --- | --- | ---
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/designer-tips-tricks"><img src="modules/nuxeo/designer-tips-tricks/designer.png" width="100px"/></a> | Design nice Designer elements | Nuxeo | Layout
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/video-thumbnail"><img src="modules/nuxeo/video-thumbnail/video-thumbnail2.png" width="100px"/></a> | Sets the video poster and search thumbnail | Nuxeo | DAM
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/google-vision-ocr"><img src="modules/nuxeo/google-vision-ocr/ocr.png" width="100px"/></a> | Extract text from an image-based PDF with Google Vision | Nuxeo | AI
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/saml-user-mapping"><img src="modules/nuxeo/saml-user-mapping/saml.png" width="100px"/></a> | Map SAML user attributes to Nuxeo | Nuxeo | Authentication
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/workflow-status"><img src="modules/nuxeo/workflow-status/workflow-status.png" width="100px"/></a> | Monitor workflow instances status | Nuxeo | Workflow
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/sensitive-data"><img src="modules/nuxeo/sensitive-data/sensitive-data1.png" width="100px"/></a> | Display sensitive data details contained in a document | Nuxeo | AI
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/convert-date-to-timestamp"><img src="modules/nuxeo/convert-date-to-timestamp/calendar.png" width="100px"/></a> | Convert Data to Timestamp | Nuxeo | Automation
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/email-templates-nuxeo"><img src="modules/nuxeo/email-templates-nuxeo/dark.png" width="100px"/></a> | Email templates | Nuxeo | Templates
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/video-conversions"><img src="modules/nuxeo/video-conversions/movie.png" width="100px"/></a> | Additional video conversions | Nuxeo | DAM
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/toggleable-form"><img src="modules/nuxeo/toggleable-form/screenshot.png" width="100px"/></a> | Inline card property edition | Nuxeo | Layout
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/salesforce-ui"><img src="modules/nuxeo/salesforce-ui/sfdc-webui.png" width="100px"/></a> | Display Salesforce metadata | Nuxeo | Salesforce
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/ssn"><img src="modules/nuxeo/ssn/ssn.jpg" width="100px"/></a> | Show/hide the value of a secret field | Nuxeo | Security
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/kibana"><img src="modules/nuxeo/kibana/kibana.png" width="100px"/></a> | Display Kibana dashboards in the "Analytics" | Nuxeo | Reporting
<a href="https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/modules/nuxeo/related-documents"><img src="modules/nuxeo/related-documents/nuxeo-related-documents.png" width="150px"/></a> | Display Document Relations | Nuxeo | Relations

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

Each new module should are created in a specific folder:

- `/modules/nuxeo`: Contributions from the Nuxeo Team, for demos, PoC or tests.
- `/modules/partners`: Contributions from the Nuxeo Partner Ecosystem.
- `/modules/community`: Contributions from the Nuxeo Community.

## Contributing

You have to follow the repository contribution [guidelines](toolkit-and-guidelines) when submitting a new addon:

- If you're a partner, create your partner folder under `/modules/partners/` if it doesn't exist already. Then, create the readme file to present your company and your contributions. We provide a [README-PARTNER.MD template](https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/toolkit-and-guidelines/README-PARTNER.md).
- Create a README file to present your module, using the [README-MODULE.MD template](https://github.com/nuxeo/nuxeo-studio-custom-elements/blob/master/toolkit-and-guidelines/README-MODULE.md).
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

## Learn

- [Nuxeo Documentation](https://doc.nuxeo.com)
- [Nuxeo University](https://university.nuxeo.com)

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo

[Nuxeo](www.nuxeo.com), developer of the leading Content Services Platform, is reinventing enterprise content management (ECM) and digital asset management (DAM). Nuxeo is fundamentally changing how people work with data and content to realize new value from digital information. Its cloud-native platform has been deployed by large enterprises, mid-sized businesses and government agencies worldwide. Customers like Verizon, Electronic Arts, ABN Amro, and the Department of Defense have used Nuxeo's technology to transform the way they do business. Founded in 2008, the company is based in New York with offices across the United States, Europe, and Asia.

Learn more at www.nuxeo.com.
