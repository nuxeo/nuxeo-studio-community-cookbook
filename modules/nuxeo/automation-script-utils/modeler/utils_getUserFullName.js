/* Receives as input a user ID, returns a string, the full name (firstname + " " + lastname)

   input: void (declared as void but can be a string, a user id)
   output: void (declared as void, but returning a string)

   var fullName;
   fullName = javascript.utils_getUserFullName(someUserId, {});

   If first/last names are not filled, just returns the login
    
   If input is null or undefined, uses currentUser.name

   IMPORTANT: Not really usable in regular automation (receives a string as input, outputs a string)
*/
function run(input, params) {
  
  var user, userFullName, firstName, lastName, pcipal;
  
  user = input;
  
  //Console.log("utils_getUserFullName - input:" + user);
  
  if(stringIsBlank(user)) {
    //Console.log("utils_getUserFullName - input is empty => Getting Current User" + user);
    user = currentUser.actingUser ? currentUser.actingUser : currentUser.name;
  }
  
  if(stringIsNotBlank(user)) {
    if(user.indexOf("user:") === 0) {
      user = user.replace("user:", "");
    }
  }
  
  if(stringIsNotBlank(user)) {
    
    pcipal = Fn.getPrincipal(user);
    
    if(pcipal !== null) {
      
      userFullName = "";
      firstName = pcipal.getFirstName();
      lastName = pcipal.getLastName();
      
      if(stringIsNotBlank(firstName)) {
        userFullName = firstName;
      }
      
      if(stringIsNotBlank(lastName)) {
        if(stringIsNotBlank(firstName)) {
          userFullName += " ";
        }
        userFullName += lastName;
      }
    }
  }
  
  if(stringIsBlank(userFullName)) {
    userFullName = user;
  }
  
  return userFullName;
}

function stringIsNotBlank(str) {
  return typeof str === "string" && str !== "";
}

function stringIsBlank(str) {
  return typeof str !== "string" || str === "";
}
