import express from 'express'
import { otpVerify, userRegister } from '../controller/userRegister.controller.js'
import { validationAsync } from '../utilities/validationAsync.js'

const router = express.Router()

router.post('/register', validationAsync( 'userSchema' ), userRegister)

export default router