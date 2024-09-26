const jwt = require('jsonwebtoken')
const RoleDB = require('../model/role.Schema')
const UserDB = require('../model/user.Schema')
const { Types } = require('mongoose')
const { resStatus } = require('../../../Node/Login_Register/utilities/resStatus.util')

const userRegister = async ( req, res ) => {
    try {
        console.log('------- user register :')
        // delete req.body.confirm_password             // no need to delete. schema won't allow any data that are not specified
        const data = await UserDB.create({...req.body, user_ID: new Types.ObjectId})
        res.send(data)
    } catch (error) {
        console.log('------- error : ' , error)
    }
}

const userLogin = async ( req, res ) => {
    const roleData = (await RoleDB.findOne({role_ID: res.locals.user.role_ID}))
    try {
        const token = jwt.sign({
            email: req.body.user_Email,
            role: roleData.role_Name,
            role_ID: roleData.role_ID
        }, 'token key', {expiresIn: '1h'})
        console.log('------- user logged in :')
        // res.cookie('token', token, {maxAge: 1 * 60 * 60 * 1000})        // expires in 1 hour
        resStatus(200)
    } catch (error) {
        console.log('------- error : ' , error)
    }
}

const getUser = async ( req, res ) => {
    const user = await UserDB.find({role_ID: {$gte: req.role_ID}})
    res.status(200).json({status: true, data: user})
} 

const setOTP = async ( req, res ) => {
    const OTP = Math.floor(Math.random() * 10000)
    await UserDB.updateOne({user_Email: req.body.user_Email}, {$set: {otp: OTP}})
    // sending OTP to mobile
    const token = jwt.sign({
        email: req.body.user_Email
    }, 'token key', {expiresIn: 10 * 60 * 1000})
    res.status(200).json({status: true, Message: 'OTP sent', token: token})
}

const verifyOTP = async ( req, res ) => {

    const user = await UserDB.findOne({user_Email: req.local.email, otp: req.body?.otp})
    if(user){
        await UserDB.updateOne({user_ID: user.user_ID}, {$set: {otp: 0}})
        const token = jwt.sign({
            user_ID: user.user_ID
        }, 'token key', {expiresIn: 10 * 60 * 1000})
        res.status(200).json({status: true, message: 'OTP matched', token: token})
    }else{
        res.status(401).json({status: false, message: 'OTP not matched'})
    }
} 

const resetPassword = async ( req, res ) => {
    try {
        const data = await UserDB.updateOne({user_ID: req.user_ID}, {$set: {password: req.body.password}})
    } catch (error) {
        console.log('------- error : ' , error)
    }
    res.status(200).json({status:true, message: 'Password Reset!'})
} 

module.exports = {userRegister, userLogin, getUser, setOTP, verifyOTP, resetPassword}