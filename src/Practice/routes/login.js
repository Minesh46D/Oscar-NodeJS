const express = require('express')
const UserDB = require('../model/user.Schema')
const RoleDB = require('../model/role.Schema')
const { userRegister, userLogin, getUser, setOTP, verifyOTP, resetPassword } = require('../Controller/login.controller')
const { verifyEmail, verifyPassword, } = require('../Middleware/login.middle')
const { confirmPassword, checkEmailExist, checkOldPassword, checkRoleID } = require('../Middleware/register.middle')
const {authorize, tokenCheck} = require('../Middleware/auth.middle')
const router = express.Router()

router.post('/register', confirmPassword , checkEmailExist, checkRoleID, userRegister)

router.get('/login', verifyEmail, verifyPassword, userLogin)

router.get('/getUser', authorize(["Admin","Team Leader"]), getUser)

router.get('/verifyEmail', verifyEmail, setOTP)

router.get('/verifyOTP', tokenCheck, verifyOTP)

router.get('/resetPassword', tokenCheck, confirmPassword, checkOldPassword, resetPassword)


module.exports = router