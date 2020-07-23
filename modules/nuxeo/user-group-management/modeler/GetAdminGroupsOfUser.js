function run(input, params) {
  var orginal_groupname, final_groupname, isAdmin;
  var adminGroupsOfUser = [];
  var admingroupofuser = {
  };
  var groupAdministratorsRegex = "-administrators";
  var username = currentUser.name;
  currentUser.groups.forEach(function (group) {
    isAdmin = group.indexOf(groupAdministratorsRegex);
    if (isAdmin > -1){
      admingroupofuser = [];
      orginal_groupname=group;
      final_groupname = orginal_groupname.replace("-administrators", "");
      adminGroupsOfUser.push(final_groupname);
    }
  }
                            );
  return adminGroupsOfUser;
}