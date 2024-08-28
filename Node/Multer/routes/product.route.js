import express from 'express'
import { addProduct } from '../controller/product.controller.js'
import { imageUpload } from '../utilities/imageUpload.js'
const router = express.Router()

router.post('/add', imageUpload.single('image') ,  addProduct )


export default router