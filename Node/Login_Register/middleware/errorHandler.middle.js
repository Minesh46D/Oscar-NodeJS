import { resStatus } from "../utilities/resStatus.util.js"

export const errorHandler = ( _, res ) => resStatus(400, res, 'Path not found')