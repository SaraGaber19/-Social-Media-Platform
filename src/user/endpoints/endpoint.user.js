const { roles } = require("../../../common/auth")

// auth 
const  endpoint ={
login:[roles.Admin,roles.user,roles.SuperAdmin],
edaitProfile:[roles.Admin,roles.user,roles.SuperAdmin],
edaitPassword:[roles.Admin,roles.user,roles.SuperAdmin],
blockUser:[roles.Admin,roles.SuperAdmin],
deactivateAccount:[roles.Admin,roles.user,roles.SuperAdmin],
insertAdmin:[roles.SuperAdmin],
getAdminList:[roles.SuperAdmin],
deleteAdmin:[roles.SuperAdmin],
updateAdmin:[roles.SuperAdmin],

}

module.exports=endpoint





