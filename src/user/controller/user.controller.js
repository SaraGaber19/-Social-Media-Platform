const bcrypt = require('bcrypt');
const generateToken = require('../../../common/generateToken');
const sendEmail = require('../../../common/sendEmail');

const user = require("../model/user.model");
var jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const crypto = require('crypto');
const sendEmailTemp = require('../../../common/templeteSendEmail');
const { roles } = require('../../../common/auth');



const SinUp = async (req, res) => {

    const { name, email, password, conPassword, phone, location } = req.body;
    // try {

    const cheakUser = await user.findOne({ email })
    if (!cheakUser) {
        if (password == conPassword) {
            const newuser = new user({ name, email, password, phone, location })
            const addUser = await newuser.save()
            const token = generateToken(addUser._id)
            console.log(token, addUser._id)
            const message = `<p> Please help us verify your identity</p> 
                 <a href="${req.protocol}://${req.headers.host}/user/confirm/${token}" style="text-decoration: none; color:white; padding:10px" >click me</a>
    <a href="${req.protocol}://${req.headers.host}/user/newconfirm/${addUser._id}" style="text-decoration: none; color:white;padding:10px ">sendNewToken</a>`
            const temp = sendEmailTemp(message, name)
            await sendEmail(email, temp)
            res.json({ message: "Suc", data: newuser })
        }
        else {
            res.json({ message: "password can not match confirm password" })
        }
    }
    else {
        res.json({ message: "email exist" })
    }
    // }


    // catch (error) {
    //     res.json({ message: "error", error })
    // }

}




const confirmEmail = async (req, res) => {

    try {
        const { token } = req.params
        if (!token || token == undefined || token == null) {
            res.json({ message: "token error" })

        } else {

            const decoded = jwt.verify(token, process.env.secretKey);

            const fuser = await user.findOneAndUpdate({ _id: decoded.id }, { confirmed: true }, { new: true });
            if (fuser) {
                res.json({ message: "confimed pleas login" })
            } else {
                res.json({ message: "in-valid link" })
            }
        }

    } catch (error) {
        res.status(500).json({ message: "catch err in token", error })
    }
}

const sendNwToken = async (req, res) => {
    const { userid } = req.params;
    try {
        const findId = await user.findOne({ _id: userid })
        if (findId) {
            if (findId.confirmed == false) {
                const token = generateToken(userid)
                const message = `<p> Please help us verify your identity</p> 
                 <a href="${req.protocol}://${req.headers.host}/user/confirm/${token}" style="text-decoration: none; color:white; padding:10px" >click me</a>
    <a href="${req.protocol}://${req.headers.host}/user/newconfirm/${addUser._id}" style="text-decoration: none; color:white;padding:10px ">sendNewToken</a>`
                const temp = sendEmailTemp(message, findId.name)
                await sendEmail(email, temp)
                res.json({ message: "Done" })
            }
            else {
                res.json({ message: "aready cofirmed" })
            }
        }
        else {
            res.json({ message: "please sin up first" })
        }


    }
    catch (error) {
        res.status(500).json({ message: "catch err ", error })
    }

}





const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const Cheakuser = await user.findOne({ email })
        console.log(Cheakuser)
        if (!Cheakuser) {
            res.json({ message: "invalid email" })
        }
        else {
            if (Cheakuser.confirmed == true) {
                const match = await bcrypt.compare(password, Cheakuser.password);
                if (match) {
                    console.log(match)
                    const token = generateToken(Cheakuser._id)
                    res.json({ message: 'loged in', token })
                }
                else {
                    res.json({ message: "password is not correct" })
                }
            }
            else {
                res.json({ message: "please confirm your email first" })
            }
        }

    }

    catch (error) {
        res.json({ message: "error", error })
    }
}

const edaitProfile = async (req, res) => {
    // try {
    const { name, email,  location } = req.body;
    
    // if (phone) {

    //    let Nphone = await CryptoJS.AES.encrypt(phone, process.env.keyOfEncry);
    //    await user.updateOne({ _id: req.user._id }, { phone: Nphone })
      
    // }
    if (email) {
        await user.updateOne({ _id: req.user._id }, {confirmed: false})
        const token = generateToken(req.user._id)
        const message = `<p> Please help us verify your identity</p> 
         <a href="${req.protocol}://${req.headers.host}/user/confirm/${token}" style="text-decoration: none; color:white; padding:10px" >click me</a>
        <a href="${req.protocol}://${req.headers.host}/user/newconfirm/${req.user._id}" style="text-decoration: none; color:white;padding:10px ">sendNewToken</a>`

        const temp = sendEmailTemp(message, req.user.name)
        await sendEmail(email, temp)
    }
   
    const updateUser = await user.findOneAndUpdate({ _id: req.user._id }, { name, email, location }, { new: true })//will verify email in hook
    if (updateUser) {
        res.json({ message: "suc", updateUser })
    }
    else {
        res.json({ message: "notUpdate", updateUser })
    }
    // } catch (error) {
    //     res.json({ message: "error", error })
    // }

}


const edaitPassword = async (req, res) => {
    try {
        const { old_password, new_password, cnew_password } = req.body;

        const cheakUser = await user.findOne({ _id: req.user._id })

        if (cheakUser) {
            console.log(cheakUser)
            const match = await bcrypt.compare(old_password, cheakUser.password);
            if (match) {
                if (new_password == cnew_password) {
                    const password = await bcrypt.hash(new_password, 4) // can not work  in hook
                    const updateUser = await user.updateOne({ _id: req.user._id }, { password })
                    res.json({ message: "suc", updateUser })
                }
                else {

                    res.json({ message: "password can not match confirm password" })
                }
            }


            else {
                res.json({ message: "you can not edit password" })
            }
        }

    } catch (error) {
        res.json({ message: "error", error })
    }

}



const blockUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const findUser = await user.findOne({ _id: userId })
        if (findUser.role == "user") {
            const updateUser = await user.findOneAndUpdate({ _id: userId }, { blocked: true }, { new: true })
            if (updateUser) {
                res.json({ message: "suc", updateUser })
            }
            else {
                res.json({ message: "notUpdate", updateUser })
            }
        }
        else {
            res.json({ message: "you can not update admin or super admin" })
        }

    } catch (error) {
        res.json({ message: "error", error })
    }

}
const deactivateAccount = async (req, res) => {
    try {

        const findUser = await user.findOneAndUpdate({ _id: req.user._id }, { deactivated: true }, { new: true })
        if (findUser) {
            res.json({ message: "your account detivated" })
        }
        else {
            res.json({ message: "failed process" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }

}
const insertAdmin = async (req, res) => {// sand email

    const { name, email, conPassword, password, phone, location } = req.body;
    try {

        const cheakUser = await user.findOne({ email })
        if (!cheakUser) {
            if (password == conPassword) {
                const newuser = new user({ name, email, password, phone, location, role: "Admin" })
                const addUser = await newuser.save()
                const token = generateToken(addUser._id)
                const message = `<p> Please help us verify your identity as Admin</p> 
            <a href="${req.protocol}://${req.headers.host}/user/confirm/${token}" style="text-decoration: none; color:white; padding:10px" >click me</a>
<a href="${req.protocol}://${req.headers.host}/user/newconfirm/${addUser._id}" style="text-decoration: none; color:white;padding:10px ">sendNewToken</a>`
                const temp = sendEmailTemp(message, name)
                await sendEmail(email, temp)
                res.json({ message: "Suc", data: newuser })
            }
            else {
                res.json({ message: "password can not match confirm password" })
            }
        }
        else {
            res.json({ message: "email exist" })
        }
    }


    catch (error) {
        res.json({ message: "error", error })
    }

}

const getAdminList = async (req, res) => {

    try {

        const admins = await user.find({ role: roles.Admin })

        if (admins.length) {
            res.json({ message: "your admins", admins })
        }
        else {
            res.json({ message: "not found" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const { userId } = req.body;
        const deleteUser = await user.findOneAndDelete({ _id: userId })

        if (deleteUser) {
            res.json({ message: "deleted", userId })
        }
        else {
            res.json({ message: "not found" })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }
}
const updateAdmin = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const updateUser = await user.findOneAndUpdate({ _id: userId }, { role: role }, { new: true })
        if (updateUser) {
            res.json({ message: "suc", updateUser })
        }
        else {
            res.json({ message: "notUpdate", updateUser })
        }
    } catch (error) {
        res.json({ message: "error", error })
    }

}
const forgotPassword = async (req, res) => {
    const { email } = req.body
    const findUser = await user.findOne({ email })
    if (findUser) {
        const resetToken = crypto.randomBytes(10).toString("hex");
        const updateUser = await user.updateOne({ _id: findUser._id }, { resetPasswordToken: resetToken, resetPasswordExpires: Date.now() + 3600000 })

        const message = `<a href="${req.protocol}://${req.headers.host}/sara/${resetToken}">click me</a>`
        const temp = sendEmailTemp(message, findUser.name)
        await sendEmail(email, temp)
        res.json({message:"suc"})
    }
    else {
        res.json(" No account with that email address exists.")

    }



}

// const restPassword= async(req,res)=>{

//     const {password}=req.body
//     const findUser=await user.findOne({ resetPasswordExpires: { $gt: Date.now() } })
// if(!findUser){
// res.json({ message:"Password reset token is invalid or has expired."})
// }
// else{
// const passwordy = await bcrypt.hash(password, 4) 
// const updateUser=await user.updateOne({_id:findUser._id},{resetPasswordToken:null,resetPasswordExpires:null,passwordy})
// res.json({ message:"done.", updateUser})
// }
// }

const sara = async (req, res) => {
    const { idToken } = req.params  // rest password
    const { password } = req.body
    const passwordsara = await bcrypt.hash(password,4)
    const updateUser = await user.findOneAndUpdate({ resetPasswordToken: idToken, resetPasswordExpires: { $gt: Date.now() } }, { resetPasswordToken: null, resetPasswordExpires: null, password: passwordsara }, { new: true })
    if (updateUser) {
        const message = `<p>your password change suc </p>`

        await sendEmail(updateUser.email, message)
        res.json({ message: "done" })
    }
    else {
        res.json({ message: "failed" })
    }

}


//const{skip,limit}= pagination(page,size)
// const admins= SearchPagination(skip,limit,search,user,["name","email"])

module.exports = {
    SinUp,
    login,
    edaitProfile,
    edaitPassword,
    blockUser,
    deactivateAccount,
    insertAdmin,
    getAdminList,
    deleteAdmin,
    updateAdmin,
    confirmEmail,
    sendNwToken,
    forgotPassword,

    sara

}