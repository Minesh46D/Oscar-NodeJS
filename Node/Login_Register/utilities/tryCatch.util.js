import { resStatus } from "./resStatus.util.js"

export const tryCatch = async ( req, res, next ) => {
    try {
        return (req, res, next)
    } catch (error) {
        resStatus(400, res, error.message)
    }
} 