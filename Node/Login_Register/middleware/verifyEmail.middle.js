import { UserDB } from "../models/user.model.js"
import { resStatus } from "../utilities/resStatus.util.js"

export const verifyEmail = async ( req, res, next ) => {
    const { emailVerifyToken } = req.params

    const User = await UserDB.findOne({ emailVerifyToken })
    if(!User){
        return resStatus( 400, res, "Invalid Email Verify Link" )
    }
    User.emailVerifyToken = undefined;
    User.emailVerify_ExpireTime = undefined;
    User.isVerified = true;
    await User.save()
    
    resStatus(200, res, "Email Verified Successfully")
} 