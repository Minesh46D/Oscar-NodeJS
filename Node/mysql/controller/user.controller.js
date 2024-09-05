import { tryCatch } from "../../Login_Register/utilities/tryCatch.util.js";
import con from "../db/mysqlConnect.js";
import { checkTableExists } from "../utils/checkTableExists.util.js";


export const getUser = tryCatch( async( req, res ) => {
    console.log('------- ...', await checkTableExists('user'))

    res.send('done')
}  )