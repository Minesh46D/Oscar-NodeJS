const express = require('express')
const student = require('../model/studentSchema')
const { Types } = require('mongoose')
const router = express.Router()


router.get('/get', async ( req, res ) => {
    const {id} = req.query
    try {
        id ? res.send(await student.find({_id: new Types.ObjectId(id)})) : res.send(await student.find())
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error\n', error)
    }
} )

router.post('/add', async ( req, res ) => {
    try {
        Object.keys(req.body).length ? res.send(await student.create(req.body)) : res.send('body is invalid')
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error\n',  error)
    }
} )

router.patch('/update', async ( req, res ) => {
    const{id} = req.query
    try {
        id ? res.send(await student.updateOne({_id: new Types.ObjectId(id)}, {$set: req.body})) : res.send('id not valid')
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error: \n', error)
    }
} )

router.delete('/delete', async ( req, res ) => {
    const {id} = req.query
    try {
        id ? res.send(await student.deleteOne({_id: new Types.ObjectId(id)})) : res.send('id not valid')
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error: \n', error)
    }
} )

module.exports = router