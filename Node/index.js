import express from 'express'
const app = express()
import router from './routes/index.route.js'
import 'dotenv/config'
import dbConnect from './db/dbConnect.js'
dbConnect()

app.use(express.json())
app.use('/', router)
app.listen(process.env.PORT, (  ) => console.log('------- server started at...', process.env.PORT) )



