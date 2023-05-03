
const Joi=require("joi");

const addReportedPostValidation={
    body:Joi.object().required().keys({
        reportComment: Joi.string().required(),
        postId:Joi.string().required().min(24).max(24)
    })
}
const ReviewReportedValidation={
    body:Joi.object().required().keys({
    repotedId:Joi.string().required().min(24).max(24)
    })
}
module.exports={
    addReportedPostValidation,
    ReviewReportedValidation
}