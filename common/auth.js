const user = require("../src/user/model/user.model")
var jwt = require("jsonwebtoken");


const roles={
    Admin:"Admin",
    user:"user",
    SuperAdmin:"superAdmin"
}


const auth = (role) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers["authorization"]
            if (headerToken) {
             
                if (headerToken.startsWith("Bearer")) {
                    const token = headerToken.split(" ")[1]
                    var decoded = jwt.verify(token, 'sara.env');
                    const findUser = await user.findById(decoded.id).select("-password")
                    if (findUser) {

                        if (role.includes(findUser.role)) {
                            // if (role == "user") {
                            //     if (findUser.blocked) {
                            //         res.json({ message: "user is blocked" })
                            //     }
                            //     else {
                            //         req.user = findUser;
                            //         next()
                            //     }
                            // }
                            // else {
                                req.user = findUser;
                                next()
                            // }

                        }
                        else {
                            res.json({ message: "not auth" })
                        }

                    }
                    else {
                        res.json({ message: "user not found" })
                    }

                }
                else {
                    res.json({ message: "token not valid" })
                }
            }
        } catch (error) {
            res.json({ message: "error", error })
        }
    }
}
module.exports ={ auth ,roles}