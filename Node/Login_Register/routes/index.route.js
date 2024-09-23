import express from 'express'
import user from "./user.route.js"
import product from "./product.route.js"
import role from "./role.route.js"

const loginRouter = express.Router()

loginRouter.use('/user', user)
loginRouter.use('/product', product)
loginRouter.use('/role', role)

export default loginRouter