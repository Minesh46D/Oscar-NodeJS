import { resStatus } from "./resStatus.util.js"

export const tryCatch = ( controller ) => async ( req, res, next ) => {
    try {
        await controller(req, res)
    } catch (error) {
        if(error.name === 'ValidationError'){
            return resStatus(409, res, error.name, error.message)
        }
        if( error.name === "MongoServerError" && error.message?.includes('duplicate key error') ){
            const name = Object.keys(error?.keyValue)[0]
            const value = Object.values(error?.keyValue)[0]
            return resStatus(409, res, 
                 name, `${ value } already exists`)
        }
        console.log('######## error: : ' , error)
        return resStatus(500, res)
    }
} 