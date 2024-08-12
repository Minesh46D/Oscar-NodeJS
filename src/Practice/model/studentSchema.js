const mongoose = require('mongoose')
const {Schema, model} = mongoose

const studentSchema = new Schema({
    studentId: Number,
    studentName: {
        type: String,
        required: true,
        lowercase: true
    },
    age: Number
}, {timestamps: true})

const student = model('students', studentSchema)

module.exports = student