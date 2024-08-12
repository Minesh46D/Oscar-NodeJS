const mongoose = require('mongoose')
const {Schema, model} = mongoose

const studentSchema = new Schema({
    studentId: Number,
    studentName: String,
    age: Number
})

const student = model('students', studentSchema)

module.exports = student