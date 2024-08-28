import jwt from 'jsonwebtoken'
import { resStatus } from '../utilities/resStatus.util'

export const authorize = ( role ) => ( req, res, next ) => {
    const auth = req.get('Authorization')
    if(!auth){
        return resStatus(401, res, 'Token required')
    }

    const token = auth.split(" ")[1]
    let decoded = ""
    try {
        decoded = jwt.verify(token, "diwmaodimawodimwaodi")
    } catch (error) {
        return res.status(200).json({status: false, message: error.message})
    }

    if(!role?.includes(decoded.role)){
        return res.status(401).json({status: false, message: "Unauthorized User"})
    }
}  