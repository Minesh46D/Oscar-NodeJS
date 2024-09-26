import jwt from "jsonwebtoken"
import { resStatus } from "../utilities/resStatus.util.js"

export const tokenCheck = ( tokenName ) => ( req, res, next ) => {
    const signedCookie = req.signedCookies[ tokenName ]
    if(!signedCookie){
        return resStatus(400, res, "Invalid Token")
    }
    let decoded = ''
    try {
        decoded = jwt.verify( signedCookie, process.env.COOKIE_SECRET )
    } catch (error) {
        console.log('------- token error : ' , error)
        return resStatus(400, res, "Invalid jwt Token")             // TODO delete jwt
    }
    req.local = decoded
    next()
    
} 