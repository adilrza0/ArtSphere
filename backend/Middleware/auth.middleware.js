const jwt = require("jsonwebtoken");
const { ListModel } = require("../model/list.model");
const { UserModel } = require("../model/user.model");
const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (token) {
        const tkn = await ListModel.findOne({ token });
        if (tkn) {
            res.status(201).send({ "message": "you have logged out, please Login again" });
        }
        else {
            
            jwt.verify(token, "users", async (err, decoded) => {
                if (decoded) {
                    console.log(decoded)
                   
                    req.body.username = decoded.username;
                    req.body.userId = decoded.userId;
                    const user= await UserModel.find({username:decoded.username})
                    if(user.length){
                        res.status(200).send({ "message": "Successfully logged in",  "username": user[0].username, "avatar": user[0].avatar, "subscription": user[0].subscription, "userId": user[0]._id });
                    }
                }
                else {
                    next()
                }
            })
        }
    }
    else {
        res.status(201).send({ "message": "check the token, you are not authorized please Login" });
    }
}
module.exports = { auth };