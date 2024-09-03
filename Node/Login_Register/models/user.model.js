import { model, Schema } from "mongoose"

var validateEmail = function(password) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password)
};


const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'userName is require'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        trim: true,
        minLength: [6, 'email is not valid length'],
        maxLength: [12, 'email is not valid length'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'email is invalid']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true,
        // validate: [validateEmail, "Minimum eight characters, at least one letter and one number"],
        // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number']
    },
    role_ID: {
        type: Number,
        ref: 'Role',
        default: 3,
        max: [20, 'role_ID is invalid']
    },
    phone_no: {
        type: String,
        // required: [true,'phone number is required'],
        match: [/[0-9]{10}/, 'phone numebr is invalid'],
    },
    firstName: {
        type: String,
        required: [true,'firstName is required'],
        trim: true,
        maxLength: [12, 'firstName is invalid']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
        trim: true,
        maxLength: [12, 'lastName is invalid']
    },
    gender: {
        type: String,
        required: [true,'gender is required'],
        trim: true,
        enum: ['Male', 'Female', 'Other']
    },
    status: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
        default: 0
    },
    otp_ExpireTime: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerifyToken: {
        type: String,
        default: ''
    },
    emailVerify_ExpireTime: {
        type: Date,
        default: Date.now
    },
    ref_ID: {
        type: String,
        default: "",
        trim: true,
        uppercase: true
    },
    ref_Code: {
        type: String,
        required: [true, 'ref_Code is required'],
        unique: [true, "ref_Code is not unique"]
    }
})
export const UserDB = model('user', userSchema)