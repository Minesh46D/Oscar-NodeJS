import express from 'express'
import { otpVerify, userLogin, userRegister } from '../controller/userRegister.controller.js'
import { validationAsync } from '../utilities/validationAsync.js'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../utilities/Swagger.json' assert { type: "json" }
import { resStatus } from '../utilities/resStatus.util.js'

const router = express.Router()

// router.use('/api-docs', swaggerUI.serve);
// router.get('/api-docs', swaggerUI.setup(swaggerDocument));
router.post('/register', validationAsync( 'userSchema' ), userRegister)
router.post('/login', userLogin)


export default router