const UserDB = require('../model/user.Schema')



const confirmPassword = ( req, res, next ) => {
    if(req.body?.password !== req.body?.confirm_password){
        return res.status(403).json({status: false, error: 'passwords does not match'})
    }
    next()
}

const checkEmailExist = async ( req, res, next ) => {
    const emailExist = await UserDB.exists({'user_Email': req.body?.user_Email})
    if(emailExist){
        return res.status(409).json({error: 'Email Already Exist'})
    }
    next()
} 

// const setOTP = async ( req, res, next ) => {
//     await UserDB.updateOne({user_Email: req.body?.user_Email}, {$set: {otp: Math.floor(Math.random() * 10000)}})
//     next()
// } 

const checkOldPassword = async ( req, res, next ) => {
    console.log('------- check old password...')
    const user = await UserDB.findOne({user_ID: req.local.user_ID})
    if(user.password === req.body.password){
        return res.status(403).json({status: false, error: 'the password must not be the same as the old password'})
    }
    req.user_ID = user.user_ID
    next()
}



module.exports = {confirmPassword, checkEmailExist, checkOldPassword}