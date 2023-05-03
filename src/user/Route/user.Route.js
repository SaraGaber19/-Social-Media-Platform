
const {auth} = require("../../../common/auth");
const validation = require("../../../common/validation");
const { SinUp, login, edaitProfile, edaitPassword, blockUser, deactivateAccount, insertAdmin, getAdminList, updateAdmin, deleteAdmin, confirmEmail, sendNwToken, forgotPassword, sara} = require("../controller/user.controller");
const endpoint = require("../endpoints/endpoint.user");
const { sinupValidator, loginv, sendNwTokenv, edaitProfilev, edaitPasswordv, blockUserv,insertAdminv,deleteAdminv,updateAdminv,forgotPasswordv,sarav,confirmEmailv
 } = require("../validation/user.validtion");



const user_route=require("express").Router()
user_route.post("/user",validation(sinupValidator), SinUp)
user_route.post("/user/login",validation( loginv),login)
user_route.put("/user",validation( edaitProfilev), auth(endpoint.edaitProfile),edaitProfile)
user_route.put("/user/editPassword",validation( edaitPasswordv),auth(endpoint.edaitPassword),edaitPassword)
user_route.patch("/user/block",validation(blockUserv),auth(endpoint.blockUser), blockUser)
user_route.patch("/user/dtAccount",auth(endpoint.deactivateAccount),deactivateAccount)//
user_route.post("/user/admin",validation(  insertAdminv),auth(endpoint.insertAdmin),insertAdmin)//
user_route.get("/user",auth(endpoint.getAdminList), getAdminList)//
user_route.delete("/user",validation(deleteAdminv),auth(endpoint.deleteAdmin),deleteAdmin)//
user_route.patch("/user",validation( updateAdminv),auth(endpoint.updateAdmin),updateAdmin)//
user_route.get("/user/confirm/:token",validation(confirmEmailv), confirmEmail)
user_route.get("/user/newconfirm/:userid",validation(sendNwTokenv), sendNwToken)
user_route.post("/user/forgot",validation(forgotPasswordv),forgotPassword )
// user_route.get("user/",restPassword)
user_route.get("/sara/:idToken",validation(sarav),sara)






module.exports=user_route;
