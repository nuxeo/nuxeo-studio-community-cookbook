# Nuxeo Email templates

Preview | id | Theme | Comments
--- | --- | --- | ---
![Light](light.png) | workflowTaskAssigned | light | Logo image comes from github
![Dark](dark.png) | workflowTaskAssigned | dark | Logo image comes from github

## Description

Improved email templates for Nuxeo Studio.

## Usage

Use these mail templates for any notification triggered by the `Document.Mail` automation operation or workflow task notifications.

## Configuration

* Use `${Runtime.getProperty('nuxeo.url')}` to get your application logo, e.g. `<img src="${Runtime.getProperty('nuxeo.url')}/img/nuxeo_dam_logo.png" />`
* If you're running on localhost, you'll need to point the logo to a static link on the Web as gmail, for example, won't display images from localhost.

## Installation

### Studio Modeler

- Upload `logo-dark.png` and `logo-light.png` in Resources > Images
- Copy the content of the template HTML file to the corresponding object in your Studio configuration (Templates | Mail Templates). If the object does not exist, create a new one with the `id` listed above.

## Documentation Links

- [Templates](https://doc.nuxeo.com/studio/templates/)
