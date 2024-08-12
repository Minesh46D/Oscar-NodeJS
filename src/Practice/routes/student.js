const express = require('express')
const student = require('../model/studentSchema')
const router = express.Router()


router.get('/get', async ( req, res ) => {
    console.log('------- getting... :')
    try {
        const data = await student.find()
        res.send(data)
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error')
    }
} )

module.exports = router