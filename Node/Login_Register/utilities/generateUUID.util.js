import { UserDB } from "../models/user.model.js"
import crypto from 'crypto'

export const generateUUID = async (  ) => {
    let Token
    let isUnique = false

    while(!isUnique){
        Token = crypto.randomUUID()
        const checkUUID = await UserDB.exists({ emailVerifyToken: Token })
        !checkUUID && (isUnique = true)
    }
    return Token
    
} 