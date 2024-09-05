import express from 'express'
import user from './user.route.js'
const sqlRouter = express.Router()

sqlRouter.use('/user', user)

export default sqlRouter