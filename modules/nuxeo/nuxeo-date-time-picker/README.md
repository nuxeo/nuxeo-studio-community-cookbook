# Nuxeo Date Time Picker

![nuxeo-date-time-picker1.png](nuxeo-date-time-picker1.png)

## Prerequisites

- Nuxeo Web UI

## Description

This modules provides a visual element to select both the date and time:
- Displays times in local timezone of browser
- Use 12-hour clock with AM/PM selector 

## Usage

On any `Date` field, use:

```html
<nuxeo-custom-date-time-picker
  role="widget"
  label="Expire date"
  value="{{document.properties.dc:expired}}">
</nuxeo-custom-date-time-picker>
```

The main element attributes are:
- `default-time` ("00:00:00.000" by default)
- `error-message`
- `show-millis` (false by default)
- `show-seconds` (false by default)

## Installation

### Studio Modeler

- Add the following XML extension under **CONFIGURATION** > **Advanced Settings** > **XML Extensions**:

```xml
<extension
  target="org.nuxeo.runtime.ConfigurationService"
  point="configuration">

  <!-- Date (time) format -->
  <property name="org.nuxeo.web.ui.dateFormat">LL LTS</property>
  <property name="org.nuxeo.web.ui.dateTimeFormat">dddd, LL LTS</property>

  <!-- First Day Of Week -->
  <property name="org.nuxeo.web.ui.firstDayOfWeek">1</property>

</extension>
```

### Studio Designer

- Copy the folder of the `designer` subfolder under the `UI` folder of the **Resources** tab of Nuxeo Studio Designer.
- Add the following contribution in your custom bundle file:
```
<link rel="import" href="custom-elements/nuxeo-custom-date-time-picker.html">
```
- Add the following translation keys in your `messages.json` file:
```
"label.time.picker.ampm.am": "AM",
"label.time.picker.ampm.pm": "PM"
```
