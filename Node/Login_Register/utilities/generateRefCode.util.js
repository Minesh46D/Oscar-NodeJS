import crypto from 'crypto'
import { UserDB } from '../models/user.model.js'

export const generateRefCode = async ( name ) => {
    let ref_Code
    let isUnique = false

    while(!isUnique){
        ref_Code = name + '_' + Math.random().toString(36).slice(7)
        const checkCode = await UserDB.exists({ ref_Code })
        !checkCode && (isUnique = true)
    }
    
    return ref_Code
}
