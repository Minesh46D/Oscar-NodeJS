import express from 'express'
import { addRole } from '../controller/role.controller.js'

const router = express.Router()

router.post( '/addRole', addRole )

export default router