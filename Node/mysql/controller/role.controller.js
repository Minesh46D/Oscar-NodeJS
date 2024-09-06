import { tryCatch } from "../../Login_Register/utilities/tryCatch.util";
import Role from "../model/role.model";

export const addRole = tryCatch( async ( req, res ) => {
    const role = await Role.create({ ...req.body });
    console.log('------- role : ' , role)
}  )  