import { resStatus } from "../utilities/resStatus.util.js"

export const tokenCheck = ( tokenName ) => ( req, res, next ) => {
    const signedCookie = req.signedCookies[ tokenName ]
    if(!signedCookie){
        return resStatus(400, res, "Invalid Token")
    }
    req.local = signedCookie
    next()
    
} 