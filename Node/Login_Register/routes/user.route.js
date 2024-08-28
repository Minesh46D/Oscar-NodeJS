import express from 'express'
import { otpVerify, userRegister } from '../controller/userRegister.controller.js'

const router = express.Router()

router.post('/register', otpVerify)

export default router