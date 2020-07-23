function run(input, params) {
  var group = params.group;
  var members = params.members;
  if (currentUser){
    var username = currentUser.name;
    var groups_of_currentUser = currentUser.allGroups;
    var groups_of_currentUser_string = groups_of_currentUser.toString();
    var isAdminOfcurrentGroup = groups_of_currentUser_string.indexOf(group+"-administrators");
    if (isAdminOfcurrentGroup > 0){
      Auth.LoginAs(
        input, {
          'name': "Administrator"
        }
      );
      Group.CreateOrUpdate(
        input, {
          'groupname': group,
          'members': members,
          'mode': "update"
        }
      );
      Auth.Logout(input, {
      }
                 );
    }
  }
  else{
    Console.log("currentUser is undefined");
  }
}
