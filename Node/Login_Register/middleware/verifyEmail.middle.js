import { JsonWebTokenError as jwt } from "jsonwebtoken"
import { resStatus } from "../utilities/resStatus.util"

export const verifyEmail = ( req, res, next ) => {
    const auth = req.get('Authorization')

    if(!auth){
        return resStatus(401, res, 'Token required')
    }

    const token = auth.split(" ")[1]
    
    try {
        const decoded = jwt.verify(token, 'diwmaodimawodimwaodi')
        req.local.email = decoded.email
        next()
    } catch (error) {
        return resStatus(401, res, 'Invalid OTP')
    }
} 