const express = require('express')
const app = express()
const port = 9999
const fs = require('fs')
const { setDefaultAutoSelectFamily } = require('net')

const studentFileName = "swagger data/student.JSON"


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

