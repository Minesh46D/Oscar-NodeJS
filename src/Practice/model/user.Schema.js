const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true,'user ID is required']
    },
    user_Name : {
        type: String,
        required: [true, 'username is required'],
        lowercase: true,
        trim: true
    },
    user_Email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        trim: true
    },
    role_ID: {
        type: Number,
        ref: "role",
        required: [true,'role ID is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true
    },
    gender: {
        type: String,
        required: [true, 'gender is required'],
        enum: ["Male","Female","Others"]
    },
    phone_no:{
        type: Number,
        required: [true,'phone number is required']
    },
    otp: {
        type: Number,
        default: 0
    }
    
}, {timestamp:true})

module.exports = UserDB = mongoose.model('user', userSchema);