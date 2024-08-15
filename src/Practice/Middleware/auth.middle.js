const jwt = require("jsonwebtoken")

const authorize = ( role ) => ( req, res, next ) => {
    const authorization = req.get('Authorization')?.split(' ')[1]
    let decoded = ""
    if(!authorization){
        return res.status(401).json({statue: false, error: 'no token'})
    }
    try {
        decoded = jwt.verify(authorization, 'token key')
    } catch (error) {
        console.log('------- error : ' , error)
        return res.status(401).json({statue: false, error: 'invalid token'})
    }
    if(!role.includes(decoded.role)){
        return res.status(401).json({status: false, error: 'Unauthorized role'})
    }
    req.email = decoded.email
    req.role = decoded.role
    req.role_ID = decoded.role_ID
    next()
}

const tokenCheck = ( req, res, next ) => {
    const authorization = req.get('Authorization')?.split(' ')[1]
    let decoded = ""
    if(!authorization){
        return res.status(401).json({statue: false, error: 'no token'})
    }
    try {
        decoded = jwt.verify(authorization, 'token key')
    } catch (error) {
        console.log('------- error : ' , error)
        return res.status(401).json({statue: false, error: 'invalid token'})
    }
    req.local = decoded
    next()
} 

module.exports = {authorize, tokenCheck}