import express from 'express'
import { changePassword, checkEmail, checkUser, otpVerify, resendEmail, sendPasswordOTP, userLogin, userLogout, userRegister, verifyEmail } from '../controller/userRegister.controller.js'
import { validationAsync } from '../utilities/validationAsync.js'
import { resStatus } from '../utilities/resStatus.util.js'
import { generateUUID } from '../utilities/generateUUID.util.js'
import { tokenCheck } from '../middleware/tokenCheck.middle.js'
import { testDB } from '../models/test.model.js'
import { tryCatch } from '../utilities/tryCatch.util.js'

const router = express.Router()

// router.use('/api-docs', swaggerUI.serve);
// router.get('/api-docs', swaggerUI.setup(swaggerDocument));
router.post('/register', validationAsync( 'registerSchema' ), userRegister)
// router.post('/login', validationAsync( 'loginSchema' ), userLogin)
router.post('/login', userLogin )
router.get('/logout', userLogout )
router.post('/verify_Email/:emailVerifyToken', verifyEmail)
router.post('/resendEmailVerify', resendEmail)
router.post('/checkUser', checkUser)
router.post('/checkEmail', checkEmail)

router.post('/forgot_password', 
    validationAsync( 'emailSchema' ), 
    sendPasswordOTP)

router.post('/verify_otp', 
    tokenCheck( 'ForgotPassword Token' ), 
    otpVerify)

router.post('/reset_password', 
    tokenCheck( 'ForgotPassword Token' ),
    validationAsync( 'passwordSchema' ), changePassword )

router.post('/change_password', 
    tokenCheck( 'Login Token' ), 
    validationAsync( 'passwordSchema' ), changePassword)



// router.get('/get', tryCatch(async ( req, res ) => {
//     await testDB.create(req.body)
//     res.send('get')
// }) )


// res.clearCookie("Login Token");
export default router