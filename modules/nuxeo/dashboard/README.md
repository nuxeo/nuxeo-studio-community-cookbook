:warning: **DEPRECATED** : This contribution is now highly improved by the DAM Configurable Dashboard Studio External Template. Please read the template description from **Nuxeo Studio Modeler**  > **CONFIGURATION** > **External Templates** :warning:

# Visual Dashboard

![dashboard](dashboard.png)

## Prerequisites

- Nuxeo Web UI

## Description

This module helps you build a nice dashboard, composed of pictures and links.

## Usage

Customize the dashboard with your own pictures, links, cards.

## Installation

### Studio Modeler

- Upload your pictures in **Resources > Images**.

### Studio Designer

- Generate a custom dashboard from **UI > Dashboard**.
- Copy paste the content of the `nuxeo-home.html` file.

## Configuration

- Adapt the dashboard to your needs. The following variable should be updated:
  - `MY_DASHBOARD_NAME`
  - `MY_FIRST_PICTURE`
  - `MY_FIRST_TITLE`
  - `MY_FIRST_SUBTITLE`
  - `MY_SECOND_PATH`
  - `MY_SECOND_PICTURE`
  - `MY_SECOND_TITLE`
  - `MY_SECOND_SUBTITLE`
  - `MY_THIRD_PATH`
  - `MY_THIRD_PICTURE`
  - `MY_THIRD_TITLE`
  - `MY_THIRD_SUBTITLE`
  - `MY_FIRST_NUXEO_CARD`
  - `MY_SECOND_NUXEO_CARD`

- In the `_refresh` function, add/update the name of your `nuxeo-data-table` id like `this.$.<DATA_TABLE_ID>.fetch();`    

:information_source: You'll find code samples in comment to understand how to configure links, pictures and cards. In the provided dashboard, you'll find one of the default card displayed in the standard dashboard, and a new card using a specific page provider and icons. Feel free to reuse the one from the original one.

## Documentation Links

- [DAM](https://doc.nuxeo.com/nxdoc/dam/)
- [HOWTO: Customize Dashboard](https://doc.nuxeo.com/nxdoc/web-ui-dashboard/)
- [Web UI Layout Elements](https://doc.nuxeo.com/nxdoc/web-ui-layouts/)
