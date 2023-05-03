const Joi=require("joi");


const creatpostValidation={
    body: Joi.object().required().keys({
        title:Joi.string().required().min(10).max(60),
        desc:Joi.string().required()
    })
}


const editPostValidatio={
    body: Joi.object().required().keys({
        title:Joi.string().required().min(10).max(60),
        desc:Joi.string().required(),
        postId:Joi.string().required().max(24).min(24)
    })
}
const deletepostValidation={
    body: Joi.object().required().keys({
        postId:Joi.string().required().max(24).min(24)
    })
}
const getUserePostsvalidation={
   query: Joi.object().required().keys({
        userId:Joi.string().max(24).min(24)
    })
}
const creatCommentValidation={
    body: Joi.object().required().keys({
        postId:Joi.string().required().max(24).min(24),
        content:Joi.string().required()
    })
}
const creatreactValidation={
    body: Joi.object().required().keys({
        postId:Joi.string().required().max(24).min(24),
        content:Joi.string().required()
    })
}



 module.exports={
    creatpostValidation,
    deletepostValidation,
    editPostValidatio,
    getUserePostsvalidation,
    creatCommentValidation,
    creatreactValidation

 }