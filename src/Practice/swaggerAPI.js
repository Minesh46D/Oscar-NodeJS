const express = require('express')
const app = express()
const port = 9999
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

const studentFileName = "swagger data/student.JSON"
const userFileName = "swagger data/user.JSON"


app.listen( port, () => {
    console.log('------- server start :', port)
})
app.use( express.json())            // Application level

// ---------------------    Student     ---------------------

app.get('/student/get', (req, res, next) => {
    const studentData = JSON.parse(fs.readFileSync(studentFileName))
    if(req.query.id){
        const selectedUser = studentData.find(( item ) => item._id === `${req.query.id}` )
        selectedUser ? res.send(selectedUser) : res.send('user not found')
        return
    }
    res.send(studentData)
})

app.post('/student/add', ( req, res ) => {
    const studentData = JSON.parse(fs.readFileSync(studentFileName))
    req.body && studentData.push(req.body)
    fs.writeFileSync(studentFileName, JSON.stringify(studentData))

    res.send('added!')
} )

app.post('/student/update', ( req, res ) => {
    let studentData = JSON.parse(fs.readFileSync(studentFileName))
    if(req.body){
        if( studentData.some(( item ) => item._id === `${req.body._id}` ) ){
            studentData = studentData.map(( item ) => item._id === `${req.body._id}` ? req.body : item )
            fs.writeFileSync(studentFileName, JSON.stringify(studentData))

            res.send(req.body)
        }else{
            res.send('data not found')
        }
        return
    }
    res.send('body not found')
} )

app.delete('/student/delete', ( req, res ) => {
    const studentData = JSON.parse(fs.readFileSync(studentFileName))
    if(req.query.id){
        const deleteIndex = studentData.findIndex(( item ) => item._id === `${req.query.id}` )
        if(deleteIndex != -1){
            studentData.splice(deleteIndex, 1)
            res.send('deleted!!')
            fs.writeFileSync(studentFileName, JSON.stringify(studentData))
        }else{
            res.send('data not found')
        }
        return
    }
    res.send('data not found')
} )


// ---------------------    User     ---------------------

app.get('/user/get', ( req, res ) => {
    const userData = JSON.parse(fs.readFileSync(userFileName))
    const {id} = req.query
    if(id){
        const selectedUser = userData.find(( item ) => item._id === `${id}` )
        if(selectedUser){
            res.send(selectedUser)
            return
        }
        res.send("user not found")
        return
    }
    res.send(userData)
} )

app.post('/user/add', upload.single('image') , ( req, res ) => {
    const userData = JSON.parse(fs.readFileSync(userFileName))
    if(req.body){
        userData.push(req.body)
        // fs.writeFileSync(userFileName, JSON.stringify(userData))
        res.send(req.file)
        return
    }
    res.send('invalid data')
} )

