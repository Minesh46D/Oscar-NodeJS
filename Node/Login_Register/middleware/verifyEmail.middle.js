import { JsonWebTokenError as jwt } from "jsonwebtoken"

export const verifyEmail = ( req, res, next ) => {
    const auth = req.get('Authorization')

    if(!auth){
        return res.status(401).json({status: false, message: "Token required"})
    }

    const token = auth.split(" ")[1]
    
    try {
        const decoded = jwt.verify(token, 'diwmaodimawodimwaodi')
        req.local.email = decoded.email
        next()
    } catch (error) {
        return res.status(200).json({status: false, message: "Invalid OTP"})
    }
} 