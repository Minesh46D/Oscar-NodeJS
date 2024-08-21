const { Types } = require('mongoose')
const UserDB = require('../model/user.Schema')

const verifyEmail = async ( req, res, next ) => {
    console.log('------- verify email :')
    const emailExist = await UserDB.exists({'user_Email': req.body?.user_Email})
    // if(req.route.path === "/register"){
    //     if(emailExist){
    //         return res.status(409).json({error: 'Email Already Exist'})
    //     }
    //     next()
    // }
    if(!emailExist){
        return res.status(401).json({error: "Email/Password Does not Match"})
    }
    next()
}

const verifyPassword = async ( req, res, next ) => {
    console.log('------- veryfy password :')
    const user = await UserDB.findOne({user_Email: req.body.user_Email})
    if(user.password !== req.body?.password){
        return res.status(401).json({error: "Email/Password Does not Match"})
    }
    res.locals.user = user
    next()
} 

module.exports = {verifyEmail, verifyPassword}