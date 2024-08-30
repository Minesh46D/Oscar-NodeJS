import { resStatus } from "./resStatus.util.js"
import { tryCatch } from "./tryCatch.util.js"
import { loginValidation } from "./validation/index.js"

export const validationAsync = ( validationRequest ) => async ( req, res, next ) => {
    if( !loginValidation[ validationRequest ] ){
        return resStatus(401, res, "Validation does not exist")
    }
    // tryCatch( async (  ) => {
    //     const value = await loginValidation[validationRequest].validationAsync( req.body )
    //     console.log('------- value : ' , value)
    // } )
    try {
        const value = await loginValidation[validationRequest].validateAsync( req.body )
        next()
    } catch (error) {
        resStatus(400, res, error.message)
    }

    // next()
    
}  