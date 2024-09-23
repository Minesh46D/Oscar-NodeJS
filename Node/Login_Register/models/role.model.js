import { model, Schema } from "mongoose"


const roleSchema = new Schema({
    role_ID: {
        type: Number,
        required: [true, "role ID is required"],
        unique: [ true, "role_ID must be unique" ]
    },
    role_Name: {
        type: String,
        required: [true, "role_Name is required"],
        unique: [ true, "role_Name must be unique" ]
    }
})
export const RoleDB = model('role', roleSchema)