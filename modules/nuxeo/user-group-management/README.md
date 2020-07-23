# User group management

![user-group-management](user-group-management.gif)

## Prerequisites

- Nuxeo Web UI

## Description

This module offers group management capabilities to regular users, without being inside the `powerusers` or the `administrators` group:
  
- Get the list of members of a group
- Add a new member
- Remove a member

## Usage

To be a group administrator, you need to create an additional group, suffixed by "`-administrators`". 

- For example, users belonging to the `grp-legal-department-administrators` group will be able to administrate users of the `grp-legal-department` group.

When a user belong to at least one administration group, a new drawer entry is displayed: the list of all administrable groups are listed by clicking on the "Group Administration" drawer entry.

The security checks are executed in the backend, inside the automation scripting contributions to make sure the addition and removal of users are allowed (these operations are temporarily executed as `Administrator`).

## Installation

### Studio Modeler

Create the two automation scripting:
- Name: `GetAdminGroupsOfUser`, input: `void`, output: `void`
- Name: `updateUsersToGroup`, input: `void`, output: `void`, with two parameters (`group` and `members` of type String)

### Studio Designer

- Create the folder `custom-elements` under `UI`, with all its elements.
- In your custom bundle file, add the following contributions:
```
<link rel="import" href="custom-elements/cookbook-user-management.html">
<link rel="import" href="custom-elements/cookbook-user-management-drawer.html">
<link rel="import" href="custom-elements/cookbook-group-management.html">
<!-- Contribution of element 'nuxeo-menu-icon' for slot 'DRAWER_ITEMS' -->
<nuxeo-slot-content name="groupsAdmin" slot="DRAWER_ITEMS" order="105">
  <template>
    <nuxeo-filter document="[[document]]" user="[[user]]" expression="user.extendedGroups.find((group) &#x3D;&gt; group.name.includes(&#x27;-administrators&#x27;)) !&#x3D; null">
      <template>
        <nuxeo-menu-icon label="drawer.groupsAdmin" name="groups-admin-menu" icon="icons:supervisor-account" route="page:cookbook-user-management"></nuxeo-menu-icon>
      </template>
    </nuxeo-filter>
  </template>
</nuxeo-slot-content>
<!-- Contribution of element 'cookbook-user-management-drawer' for slot 'DRAWER_PAGES' -->
<nuxeo-slot-content name="groupsAdminDrawer" slot="DRAWER_PAGES">
  <template>
    <cookbook-user-management-drawer user="[[user]]" name="groups-admin-menu"></cookbook-user-management-drawer>
  </template>
</nuxeo-slot-content>
<!-- Contribution of element 'terumo-user-management' for slot 'PAGES' -->
<nuxeo-slot-content name="userManagementPage" slot="PAGES">
  <template>
    <cookbook-user-management user="[[user]]" name="cookbook-user-management"></cookbook-user-management>
  </template>
</nuxeo-slot-content>
``` 
- Add the translation keys:
```
{
  "drawer.groupsAdmin" : "Group Administration",
  "app.title.cookbook-user-management" : "Group Administration",
  "label.userGroupManagement.managementOf" : "Management of the {0} group",
	"label.userGroupManagement": "User group management",
  "label.userGroupManagement.addUser": "Add user to group {0}",
  "label.userGroupManagement.addUser.placeholder" : "Select a user",
  "label.userGroupManagement.heading.users": "Users of group {0}",
  "label.userGroupManagement.list": "Groups you can manage"
}
```