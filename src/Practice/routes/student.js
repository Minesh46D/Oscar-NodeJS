const express = require('express')
const student = require('../model/studentSchema')
const { Types } = require('mongoose')
const { getStudentData, addStudentData, updateStudentData, deleteStudentData } = require('../Controller/student.controller')
const router = express.Router()

router.get('/get', getStudentData )

router.post('/add', addStudentData )

router.patch('/update', updateStudentData )

router.delete('/delete', deleteStudentData )

module.exports = router