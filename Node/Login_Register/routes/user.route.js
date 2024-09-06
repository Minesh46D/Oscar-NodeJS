import express from 'express'
import { changePassword, otpVerify, resentEmail, sendPasswordOTP, userLogin, userRegister, verifyEmail } from '../controller/userRegister.controller.js'
import { validationAsync } from '../utilities/validationAsync.js'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../utilities/Swagger.json' assert { type: "json" }
import { resStatus } from '../utilities/resStatus.util.js'
import { generateUUID } from '../utilities/generateUUID.util.js'

const router = express.Router()

// router.use('/api-docs', swaggerUI.serve);
// router.get('/api-docs', swaggerUI.setup(swaggerDocument));
router.post('/register', validationAsync( 'registerSchema' ), userRegister)          // done
router.post('/login', validationAsync( 'loginSchema' ), userLogin)                   // done
router.post('/verify_Email/:emailVerifyToken', verifyEmail)                          // done
router.post('/resendEmailVerify', resentEmail)                                       // done
router.post('/forgot_password', validationAsync( 'emailSchema' ), sendPasswordOTP)   // done
router.post('/verify_otp', otpVerify)                                                // done
router.post('/change_password', changePassword)






// router.get('/get', async ( req, res ) => {
//     console.log('------- req.cookie : ' , req.signedCookies['Login Tokenn'])
    // res.clearCookie("Login Token");
    // res.send('get')
    // resStatus(400, res)
// } )


export default router