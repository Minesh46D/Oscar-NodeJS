import express from 'express'
import { userRegister } from '../controller/userRegister.controller'

const router = express.Router()

router.post('/register', userRegister)