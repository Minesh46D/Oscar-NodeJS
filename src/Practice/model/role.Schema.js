const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_ID: {
        type: Number,
        required: [true, 'role ID is required'],
        unique: true
    },
    role_Name: {
        type: String,
        required: [true, 'role name is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    role_Description: String
}, {timestamp: true})

module.exports = RoleDB = mongoose.model('role', roleSchema)