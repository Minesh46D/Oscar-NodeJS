import { resStatus } from "./resStatus.util.js"

export const tryCatch = async ( fun ) => {
    try {
        return fun
    } catch (error) {
        console.log('------- error...')
    }
} 