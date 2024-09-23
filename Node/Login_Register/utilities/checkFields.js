import { resStatus } from "./resStatus.util.js";

export const checkFields = ( res, ...fields ) => {
    if( fields.some( ( field ) => !field  ) ){
        return resStatus(400, res, "All fields are required");
    }
} 