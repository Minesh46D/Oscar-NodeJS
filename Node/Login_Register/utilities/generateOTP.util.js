import crypto from 'crypto'
import { UserDB } from '../models/user.model.js'

export const generateOTP = async (  ) => {
    let otp
    let isUnique = false

    while(!isUnique){
        otp = crypto.randomInt(100000, 999999)
        const checkOTP = await UserDB.exists({otp})
        !checkOTP && (isUnique = true)
    }
    return otp
}