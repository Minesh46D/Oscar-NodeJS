import { UserDB } from "../models/user.model.js"
import bcrypt, { hash } from 'bcrypt'
import { generateOTP } from "../utilities/generateOTP.util.js"
import jwt from "jsonwebtoken"
import { RoleDB } from "../models/role.model.js"
import { tryCatch } from "../utilities/tryCatch.util.js"

export const userRegister = async ( req, res ) => {
    const { userName, email, password, phone_no, firstName, lastName, gender } = req.body
    
    // ---------------------    Empty Field validation     ---------------------
    if( [userName, email, password, phone_no, firstName, lastName, gender].some(( field ) => !field ) ){
        return res.status(400).json({status: false, message: "All fields are required"})
    }
    
    const checkUser = await UserDB.exists({ $or: [ {email }, {phone_no}, {userName} ]})
    if(checkUser){
        return res.status(400).json({status: false, message: "User already exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const checkPass = await bcrypt.compare(req.body.confirm_password, hashPassword)
    if(!checkPass){
        return res.status(400).json({status: false, message: "Password does not match"})
    }

    const otp = await generateOTP()
    const expireTime = Date.now() + 1 * 60 * 60 * 1000

    console.log('------- userName : ' , userName)
    const user = await UserDB.create({
        userName,
        email,
        password: hashPassword,
        phone_no,
        firstName,
        lastName,
        gender,
        otp,
        otp_ExpireTime: expireTime
    })

    const getUser = await UserDB.findOne({_id: user._id}).select("-password")

    res.status(200).json({status: true, message: 'Registered', data: getUser})
}

export const userLogin = async ( req, res ) => {
    const { user, password } = req.body
    try {
        if([user,password].some(( item ) => !item )){
            return res.status(400).json({status: false, message: "All Field are required"})
        }

        let checkUser;
        if(typeof uesr === "number"){
            checkUser = await UserDB.findOne({phone_no: user})
        }else{
            checkUser = await UserDB.findOne({$or: [ {email: user}, {userName: user} ]})
        }

        if(!checkUser){
            return res.status(400).json({status: false, message: "Invalid Username or Password"})
        }

        const checkPass = await bcrypt.compare(password, checkUser.password)
        if(!checkPass){
            return res.status(400).json({status: false, message: "Invalid Username or Password"})
        }

        const getRole = await RoleDB.findOne({role_Name: checkUser.role_Name})
        if(!getRole){
            return res.status(400).json({status: false, message: "Invalid Role"})
        }

        const token = jwt.sign({
            email: checkUser.email,
            role: getRole.role_Name
        }, "diwmaodimawodimwaodi", {expireIn: '10h'})

        return res.status(200).json({status: true, data: {...checkUser,_doc, otp: undefined, password: undefined, otp_ExpireTime: undefined}, token: token})
    } catch (error) {
        return res.status(400).json({status: false, message: error.message})
    }
} 


export const forgotPassword = async ( req, res ) =>  {
    const { email } = req.body
    try {
        const user = await UserDB.findOne({ email })
        if(!user){
            return res.status(400).json({status: false, message: "User not found"})
        }

        const otp = await generateOTP()
        const expireTime = Date.now() + 1 * 60 * 1000

        user.otp = otp
        user.otp_ExpireTime = expireTime
        await user.save()

        const token = jwt.sign({
            email: user.email
        }, 'diwmaodimawodimwaodi', {expireIn: '10m'})

        return res.status(200).json({status: true, message: "Email verify success"})
    } catch (error) {
        return res.status(400).json({status: false, message: error.message})
    }


}



export const changePassword = async ( req, res ) =>  {
    const { newPassword, confirmPassword, email } = req.body
    try {
        
        if([newPassword, confirmPassword].some(( item ) => !item )){
            return res.status(400).json({status: false, message: "All field are required"})
        }

        const user = await UserDB.findOne({ email })

        const checkOldPass = await bcrypt.compare(newPassword, user.password)

        if(checkOldPass){
            return res.status(400).json({status: false, message: "new password can not be same as old password"})
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        const checkPass = await bcrypt.compare(confirmPassword, hashPassword)

        if(!checkPass){
            return res.status(400).json({status: false, message: "Password not same"})
        }

        await UserDB.updateOne({_id : user._id}, {$set: {password: hashPassword}})

        return res.status(200).json({status: true, message: "Password updated successfully"})
    } catch (error) {
        return res.status(200).json({status: false, message: error.message})
    }
}

export const resetPassword = async ( req, res ) => {
    const { oldPassword, newPassword, confirmPassword, email } = req.body

    try {
        const user = await UserDB.findOne({email})
        const checkPass = await bcrypt.compare(oldPassword, user.password)

        if(!checkPass){
            return res.status(400).json({status: false, message: "old password not same"})
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        const checkNewPass = await bcrypt.compare(confirmPassword, hashPassword)

        if(!checkNewPass){
            return res.status(400).json({status: false, message: "New Password can not be same as old password"})
        }

        await UserDB.updateOne({_id: user._id}, {$set: {password: hashPassword}})
        return res.status(200).json({status:true, message: "password reset success"})
    } catch (error) {
        return res.status(200).json({status: false, message: error.message})
    }
} 

export const otpVerify = tryCatch( async ( req, res ) => {
    const user = await UserDB.findOne({email: req.email, otp: code, otp_ExpireTime: {$gt: Date.now()}})
        if(!user){
            return res.status(400).json({status: false, message: "Invalid OTP"})
        }
        user.otp = undefined
        user.expireTime = undefined
        await user.save()

        return res.status(200).json({status: true, message: "OTP verify successfully"})
} )