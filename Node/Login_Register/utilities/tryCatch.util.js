import { resStatus } from "./resStatus.util.js"

export const tryCatch = ( controller ) => async ( req, res, next ) => {
    try {
        await controller(req, res)
    } catch (error) {
        console.log('######## error: : ' , error)
        resStatus(500, res)
    }
} 