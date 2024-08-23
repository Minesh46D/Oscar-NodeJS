import express from 'express'
import { imageUpload } from '../middleware/product.middle.js'
import { addProduct } from '../controller/product.controller.js'
import multer from 'multer'
// const upload = multer({dest: 'uploads/'})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

const router = express.Router()

router.get('/add', upload.single('image') ,  addProduct )


export default router