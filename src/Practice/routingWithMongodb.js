// require('./config/dbConnect')
const express = require('express')
const app = express()
const router = require('./routes/index')
require('dotenv').config()
const dbconnect = require('./Database/dbConnect')

dbconnect()

// const port = 5000
app.use(express.json())
app.use('/',router)
app.listen( process.env.PORT, (  ) => console.log('------- Server Started at  :', process.env.PORT) )