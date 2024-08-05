const fs = require('fs')
const express = require('express')
const multer  = require('multer')
const upload = multer()
const app = express()
const port = 9999
const studentFileName = "./Swagger data/student.JSON"
const userFileName = "./Swagger data/user.JSON"

app.use(express.json())         // app level

app.listen(port, () => {
    console.log('------- server started :', port)
})

//  ----------------------------------- STUDENT API ----------------------------
app.get('/student/get', (req, res) => {
    const {id} = req.query;
    const studentData = JSON.parse(fs.readFileSync(studentFileName))
    if(id){
        const newData = studentData.find((item) => `${item._id}` === `${id}`)
        if(!newData){
            res.send('studentData not found')
            // res.writeHead(200, {'Content-Type': 'text/html'})
        }else{
            // res.writeHead(200, {'Content-Type': 'text/html'})
            res.send(studentData.find((item) => `${item._id}` === `${id}`))
        }
    }else{
        res.send(studentData)
    }
})

app.post('/student/add', (req, res) => {
    const studentData = JSON.parse(fs.readFileSync(studentFileName))
    studentData.push(req.body)
    fs.writeFileSync(studentFileName, JSON.stringify(studentData))

    res.send(req.body)
})

app.post('/student/update', (req, res) => {
    let studentData = JSON.parse(fs.readFileSync(studentFileName))
    const editId = req.body._id
    const newData = studentData.find((item) => item._id === `${editId}`)
    if(!newData){
        // res.writeHead(404, {'Content-Type': 'text/html'})
        res.send('studentData not found')
    }else{
        studentData = studentData.map((item) => item._id === `${editId}` ? req.body : item)
        fs.writeFileSync(studentFileName, JSON.stringify(studentData))

        // res.writeHead(200, {'Content-Type': 'text/html'})
        res.send('updated!!')
    }
})

app.delete('/student/delete', (req, res) => {
    let studentData = JSON.parse(fs.readFileSync(studentFileName))
    const {id} = req.query
    const deleteData = studentData.find((item) => item._id === `${id}`)
    if(!deleteData){
        res.send('id not found')
    }else{
        studentData = studentData.filter((item) => item._id !== `${id}`)
        fs.writeFileSync(studentFileName, JSON.stringify(studentData))
    }

    res.send('deleted')
})

//  ----------------------------------- USER API ----------------------------

app.get('/user/get', (req, res) => {
    const {id} = req.query;
    const userData = JSON.parse(fs.readFileSync(userFileName))
    if(id){
        const selectedUser = userData.find((item) => `${item._id}` === `${id}`)
        if(selectedUser){
            res.send(selectedUser)
        }else{
            res.send('user not found')
        }
    }else{
        res.send(userData)
    }
})

app.post('/user/add', upload.none() , (req, res) => {
    console.log('------- req.header : ' , req.body)
    const userData = JSON.parse(fs.readFileSync(userFileName))
    userData.push(req.body)
    fs.writeFileSync(userFileName, JSON.stringify(userData))
    res.send(req.body)
})