import express from 'express'
import { addRole } from '../controller/role.controller'
const router = express.Router()

router.post('/add', addRole)

export default router