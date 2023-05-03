const Joi=require("joi");

const sinupValidator={
body: Joi.object().required().keys({
    name:Joi.string().required(),
    email: Joi.string().required(),
 password:Joi.string().required(),
 conPassword:Joi.ref("password"),
    phone:Joi.number(),
   location:Joi.string()
})

}
const confirmEmailv={
    params: Joi.object().required().keys({
        token:Joi.string().required()
    })
    
}

const sendNwTokenv=
{
    params:Joi.object().required().keys({
        userid:Joi.string().required().max(24).min(24)
    })
    
}

const loginv={
    body:Joi.object().required().keys({
        email: Joi.string().required(),
        password:Joi.string().required(),
    })
    
}
const edaitProfilev={
    body:Joi.object().required().keys({
        name:Joi.string() ,
        email: Joi.string(),
         phone:Joi.number(),
          location:Joi.string()
    })
}
 const edaitPasswordv ={
    old_password:Joi.string().required(), 
    new_password:Joi.string().required(),
     cnew_password:Joi.ref("new_password"),
 }
const blockUserv={
    body:Joi.object().required().keys({
        userId:Joi.string().required().min(24).max(24)
        })
}

const insertAdminv={
    body: Joi.object().required().keys({
        name:Joi.string().required(),
        email: Joi.string().required(),
     password:Joi.string().required(),
     conPassword:Joi.ref("password"),
        phone:Joi.number(),
       location:Joi.string()
    })
}
const deleteAdminv={
    body:Joi.object().required().keys({
    userId:Joi.string().required().min(24).max(24)
    })
}
const updateAdminv={
    body:Joi.object().required().keys({
    userId:Joi.string().required().min(24).max(24)
    , role :Joi.string().required()
    })
}
const forgotPasswordv={
    body:Joi.object().required().keys({
    email: Joi.string().required(),
    })
}
const  sarav={
    body:Joi.object().required().keys({
        password:Joi.string().required(),
    }),
    params:Joi.object().required().keys({
        idToken:Joi.string().required()
    })
}

module.exports={
    sinupValidator,
    sendNwTokenv,
    loginv,
    edaitProfilev,
    edaitPasswordv,
    blockUserv,
    insertAdminv,
    deleteAdminv,
    updateAdminv,
    forgotPasswordv,
    sarav,
    confirmEmailv


    
}