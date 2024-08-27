import express from 'express'
import user from './user.route.js'

const loginRouter = express.Router()

loginRouter.use('/user', user)

export default loginRouter