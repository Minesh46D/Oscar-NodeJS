import express from 'express'
import { otpVerify, userRegister } from '../controller/userRegister.controller.js'
import { validationAsync } from '../utilities/validationAsync.js'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../utilities/Swagger.json' assert { type: "json" }

const router = express.Router()

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocument));
router.post('/register', validationAsync( 'userSchema' ), userRegister)

export default router