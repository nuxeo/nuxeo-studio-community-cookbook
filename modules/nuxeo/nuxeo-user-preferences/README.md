# Nuxeo User Preferences

This element allows to Get/Set/Delete a saved user preference.

> [!WARNING]
> It uses the `me/preferences` REST API that is available only starting with **NUXEO 2023.45** and **2025.16**. If used with a non compatible version, getting/setting a value always return a 404.

Also notice that is it really usable starting 2025.17 (before that, only admins. could create a user preference)

See [User Preferences Endpoint](https://doc.nuxeo.com/nxdoc/user-preferences-endpoint/#) for details.

> [!NOTE]
> This is about storing user preferences server-side (not localstorage browser side, for example)

## Prerequisites

* Nuxeo Web UI
* Nuxeo LTS 2025.16 or greater / Nuxeo LTS 2023.45 or greater

## Installation

Copy the nuxeo-user-preferences element in Designer, wherever you want, typically in the "elements"  folder (create this folder in "UI" if needed).

## Usage

The element allows for getting, setting or deleting a user preference (it is always the current, authenticated, user)

First, import the element (adapt the path):

```
<link rel="import" href="PATH/TO/nuxeo-user-preferences.html">
```

### Getting a Preference

* To automatically fetch the value, use the auto property:

```html
<nuxeo-user-preferences id="userPref" key="thePref" value="[[value]]" auto></nuxeo-user-preferences>
```

* No auto property => fetch on demand and explicitely call `getValue()`.

```html
<nuxeo-user-preferences id="userPref" key="thePref" value="[[value]]"></nuxeo-user-preferences>
. . .
this.$.userPref.getValue();
```

In all cases (auto or manual), you can set an observer on the preference to detect once it has been fetched.

> [!IMPORTANT]
> **GETTING A PREFERENCE THAT DOES NOT EXIST**
> 
> When getting a preference that does not exist, Nuxeo returns a 404. The element then explicitely sets the value to "NOT_FOUND".
  So, typically, in your element you should detect that. For example:
> 
> ```HTML
> <nuxeo-user-preferences key="thePref" value="{{thePrefValue}}" auto></nuxeo-user-preferences>
> . . .
> observers: ['_thePrefValueChanged(thePrefValue)'],
> _thePrefValueChanged: function(value) {
>   if(value === "NOT_FOUND") {
>     // The preference does not exist, handle this case. For example, set a default value:
>     this.thePrefValue = "bar";
>   } else {
>     // The preference exists, handle the value
>   }

> [!NOTE]
> Also, the element handles the fact that the value may be sanitized (See `nuxeo.user.preferences.sanitizeValues.enabled`, https://doc.nuxeo.com/nxdoc/user-preferences-endpoint/#global-user-preferences), and decodes it.

### Setting a Preference

Setting a preference requires the `nuxeo-user-preferences` element has an ID and you call its `setValue()` method. It is an asynchronous call that returns a promise, so you can handle success and error cases.

The value must be a string (call JSON.stringify before if needed).

```html
<nuxeo-user-preferences id="userPref" key="thePref" value="{{thePrefValue}}" auto></nuxeo-user-preferences>
. . .
this.$.userPref
      .setValue(newPrefValueString)
      .then(function() {
        // Success
      }.bind(this))
      .catch(function() {
        // Error => display message, for example
      }.bind(this));
```

### Deleting a Preference

Deleting a preference requires the `nuxeo-user-preferences` element has an ID and you call its `deletePreference()`  method. It is an asynchronous call that returns a promise, so you can handle success and error cases.

> [!IMPORTANT]
> This deletes the whole preferences, it is not about removing the value. To clear the value, pass an empty string.

Example:

```html
<nuxeo-user-preferences id="userPref" key="thePref" value="{{thePrefValue}}" auto></nuxeo-user-preferences>
  . . .
this.$.userPref
      .deletePreference()
      .then(function() {
        // Success
      }.bind(this))
      .catch(function() {
        // Error => display message, for example
      }.bind(this));
```