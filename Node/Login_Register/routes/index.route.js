import express from 'express'
import user from "./user.route.js"
import product from "./product.route.js"

const loginRouter = express.Router()

loginRouter.use('/user', user)
loginRouter.use('/product', product)

export default loginRouter