const express = require('express')
const router = express.Router()
const student = require('./student')
const login = require('./login')

router.use('/students', student)
router.use('/login', login)

module.exports = router;