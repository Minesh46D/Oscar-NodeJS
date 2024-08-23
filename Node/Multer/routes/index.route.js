import express from 'express'
const router = express.Router()
import product from './product.route.js'

router.use('/product', product)

export default router