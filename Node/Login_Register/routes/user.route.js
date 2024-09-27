import express from 'express'
import { changePassword, checkEmail, checkUser, getUser, otpVerify, resendEmail, sendPasswordOTP, userLogin, userLogout, userRegister, verifyEmail } from '../controller/userRegister.controller.js'
import { validationAsync } from '../utilities/validationAsync.js'
import { resStatus } from '../utilities/resStatus.util.js'
import { generateUUID } from '../utilities/generateUUID.util.js'
import { tokenCheck } from '../middleware/tokenCheck.middle.js'
import { testDB } from '../models/test.model.js'
import { tryCatch } from '../utilities/tryCatch.util.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// router.use('/api-docs', swaggerUI.serve);
// router.get('/api-docs', swaggerUI.setup(swaggerDocument));
router.post('/register', validationAsync( 'registerSchema' ), userRegister)
// router.post('/login', validationAsync( 'loginSchema' ), userLogin)
router.post('/login', userLogin )
router.get('/',
    tokenCheck( 'Login Token' ),
    getUser 
)
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



router.get('/set', tryCatch(async ( req, res ) => {                             // XXX remove this at the end of the project
    res.cookie('tempCookie', 'abc', {
        secure: true, // This is required when sameSite is 'None'
        signed: false,
        maxAge: 20 * 60 * 1000,
        httpOnly: true,
        sameSite: 'None' // Cross-site cookies
    });
    // await testDB.create(req.body)
    res.send('get')
}) )
router.get('/get', tryCatch(async ( req, res ) => {                             // XXX remove this at the end of the project
    const cookies = req.cookies //
    const signedCookies = req.signedCookies['ForgotPassword Token']
    console.log('------- cookies : ' , cookies)
    console.log('------- signed cookies : ' , signedCookies)
    console.log('------- Final Cookie : ' , jwt.verify( signedCookies , process.env.COOKIE_SECRET))

    res.status(200).json({ cookies, signedCookies })
    // resStatus( 200, res, null, `cookie: ${cookie}` )
    // res.clearCookie('tempCookie')
    // await testDB.create(req.body)
    // res.send('get')
}) )


// res.clearCookie("Login Token");
export default router