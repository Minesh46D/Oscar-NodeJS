import { model, Schema } from "mongoose"


const roleSchema = new Schema({
    role_ID: {
        type: Number,
        required: [true, 'role ID is required']
    },
    role_Name: {
        type: String,
        required: [true, 'role_Name is required']
    }
})
export const RoleDB = model('role', roleSchema)