import express from 'express'
import { changePassword, checkUser, otpVerify, resendEmail, sendPasswordOTP, userLogin, userRegister, verifyEmail } from '../controller/userRegister.controller.js'
import { validationAsync } from '../utilities/validationAsync.js'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../utilities/Swagger.json' assert { type: "json" }
import { resStatus } from '../utilities/resStatus.util.js'
import { generateUUID } from '../utilities/generateUUID.util.js'
import { tokenCheck } from '../middleware/tokenCheck.middle.js'
import { testDB } from '../models/test.model.js'
import { tryCatch } from '../utilities/tryCatch.util.js'

const router = express.Router()

// router.use('/api-docs', swaggerUI.serve);
// router.get('/api-docs', swaggerUI.setup(swaggerDocument));
router.post('/register', validationAsync( 'registerSchema' ), userRegister)          // done
// router.post('/login', validationAsync( 'loginSchema' ), userLogin)                // done
router.post('/login', userLogin)                                                     // done
router.post('/verify_Email/:emailVerifyToken', verifyEmail)                          // done
router.post('/resendEmailVerify', resendEmail)                                       // done
router.post('/checkUser', checkUser)

router.post('/forgot_password', validationAsync( 'emailSchema' ), sendPasswordOTP)   // done
router.post('/verify_otp', tokenCheck( 'ForgotPassword Token'  ), otpVerify)         // done                                      // done
router.post('/reset_password', tokenCheck( 'ForgotPassword Token'), validationAsync( 'passwordSchema' ), changePassword )   // done
router.post('/change_password', tokenCheck( 'Login Token' ), validationAsync( 'passwordSchema' ), changePassword)           // done



// router.get('/get', tryCatch(async ( req, res ) => {
//     await testDB.create(req.body)
//     res.send('get')
// }) )


// res.clearCookie("Login Token");
export default router