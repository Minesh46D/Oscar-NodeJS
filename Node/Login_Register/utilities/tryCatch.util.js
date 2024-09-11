import { resStatus } from "./resStatus.util.js"

export const tryCatch = ( controller ) => async ( req, res, next ) => {
    try {
        await controller(req, res)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return resStatus(409, res, error.name, error.message)
        }
        console.log('######## error: : ' , error)
        return resStatus(500, res)
    }
} 