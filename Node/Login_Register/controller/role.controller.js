import { RoleDB } from "../models/role.model.js";
import { checkFields } from "../utilities/checkFields.js";
import { resStatus } from "../utilities/resStatus.util.js";
import { tryCatch } from "../utilities/tryCatch.util.js";

export const addRole = tryCatch( async ( req, res ) => {
    const { role_ID, role_Name } = req.body
    checkFields( res, role_ID, role_Name );
    
    const role = await RoleDB.create({ role_ID, role_Name })
    resStatus(200, res, null, 'Success', { data: role } )
}  )