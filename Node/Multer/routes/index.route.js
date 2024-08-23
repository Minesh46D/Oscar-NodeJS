import express from 'express'
const multerRouter = express.Router()
import product from './product.route.js'

multerRouter.use('/product', product)

export default multerRouter