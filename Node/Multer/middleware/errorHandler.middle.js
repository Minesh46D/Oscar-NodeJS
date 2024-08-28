import { resStatus } from "../utilities/resStatus.util.js"

export const errorHandler = ( _, res ) => resStatus(400, res)

    // res.status(400).json({status: false, message: 'error handler'})