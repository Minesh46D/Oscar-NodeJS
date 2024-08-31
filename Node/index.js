import express from 'express'
const app = express()
import 'dotenv/config'
import dbConnect from './db/dbConnect.js'
import multerRouter from './Multer/routes/index.route.js'
import loginRouter from './Login_Register/routes/index.route.js'
import { errorHandler } from './Login_Register/middleware/errorHandler.middle.js'
import { resStatus } from './Login_Register/utilities/resStatus.util.js'
dbConnect()
app.listen(process.env.PORT, (  ) => console.log('------- server started at...', process.env.PORT) )


app.use(express.json())
app.use(express.static('uploads'))
// app.use('/product',express.static('uploads'))
// http://localhost:5000/product/images/android.png
// http://localhost:5000/android.png
// app.use(express.static('uploads/images'))
// http://localhost:5000/images/android.png


app.use('/multer', multerRouter)
app.use('/login-register', loginRouter)

// app.use(( err, req, res, next ) => {
//     resStatus(500, res, err.message)
// } )


app.use(errorHandler)


