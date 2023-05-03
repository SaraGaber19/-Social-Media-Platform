const { roles } = require("../../../common/auth");

const postEndPoints={
    creatpost:[roles.Admin,roles.SuperAdmin,roles.user],
    editpost:[roles.Admin,roles.SuperAdmin,roles.user],
    deletePost:[roles.Admin,roles.SuperAdmin,roles.user],
    getUserePosts:[roles.Admin,roles.SuperAdmin,roles.user],
    getAllUserposts:[roles.Admin,roles.SuperAdmin],
    creatcomment:[roles.Admin,roles.SuperAdmin,roles.user],
    creatReact:[roles.Admin,roles.SuperAdmin,roles.user]
    

}
module.exports= postEndPoints


