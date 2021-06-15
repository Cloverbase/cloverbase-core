const AccessControl = require("accesscontrol");
const ac = new AccessControl();
  
exports.roles = (function() {

ac.grant("basic")
 .readOwn("data")
 .createOwn("data")
 .updateOwn("data")
 .deleteOwn('data')
 .createOwn('files')
 
 
ac.grant("admin")
 .extend("basic")
 .readAny('data')
 .createAny('data')
 .updateAny("data")
 .deleteAny("data")
 .createAny('files')

 
return ac;
})();
