import express from 'express'
const app = express()
import 'dotenv/config'
import dbConnect from './db/dbConnect.js'
import multerRouter from './Multer/routes/index.route.js'
dbConnect()

app.use(express.json())
app.listen(process.env.PORT, (  ) => console.log('------- server started at...', process.env.PORT) )


// app.use('/product',express.static('uploads'))
// http://localhost:5000/product/images/android.png
app.use(express.static('uploads'))
// http://localhost:5000/images/android.png

app.use('/multer', multerRouter)



