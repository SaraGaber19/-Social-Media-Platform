const {auth, roles} = require("../../../common/auth");
const validation = require("../../../common/validation");
const { creatpost, editpost, deletePost, getUserePosts, getAllUser, getAllUserposts, creatcomment, creatReact } = require("../controller/controller.posts");
const postEndPoints = require("../endpoints/posts.endpoints");
const { getUserePostsvalidation, creatpostValidation, deletepostValidation, editPostValidatio, creatCommentValidation, creatreactValidation } = require("../validation/post .validation");


const posts_route=require("express").Router();

posts_route.post("/posts", validation(creatpostValidation),auth(postEndPoints.creatpost),creatpost)
posts_route.put("/posts",validation( editPostValidatio),auth(postEndPoints.editpost),editpost) 
posts_route.delete("/posts",validation( deletepostValidation),auth(postEndPoints.deletePost),deletePost)// مزوده السوبر ادمن من باب اولى يعني بما ان متاح للادمن
posts_route.get("/posts/profile",validation(getUserePostsvalidation),auth(postEndPoints.getAllUserposts),getUserePosts)
posts_route.get("/posts",auth(postEndPoints.getAllUserposts),getAllUserposts)
posts_route.post("/posts/comment", validation(creatCommentValidation),auth(postEndPoints.creatcomment),creatcomment)
posts_route.post("/posts/react", validation(creatreactValidation),auth(postEndPoints.creatReact),creatReact)


module.exports=posts_route