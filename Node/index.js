import express from 'express'
const app = express()
import 'dotenv/config'
import dbConnect from './db/dbConnect.js'
import multerRouter from './Multer/routes/index.route.js'
import loginRouter from './Login_Register/routes/index.route.js'
import { errorHandler } from './Login_Register/middleware/errorHandler.middle.js'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './Login_Register/utilities/Swagger.json' assert { type: "json" }
dbConnect()

app.use(express.json())
app.listen(process.env.PORT, (  ) => console.log('------- server started at...', process.env.PORT) )


// app.use('/product',express.static('uploads'))
// http://localhost:5000/product/images/android.png

app.use(express.static('uploads'))
// http://localhost:5000/android.png

// app.use(express.static('uploads/images'))
// http://localhost:5000/images/android.png


app.use('/multer', multerRouter)
app.use('/login-register', loginRouter)


app.use(errorHandler)


