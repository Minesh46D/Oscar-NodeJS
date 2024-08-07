const express = require('express')
const app = express()
const port = 9999
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

const studentFileName = "./src/practice/Swagger data/student.json"
const userFileName = "./src/practice/Swagger data/user.json"


app.listen( port, () => {
    console.log('------- server start :', port)
})
app.use( express.json())            // Application level

// ---------------------    Student     ---------------------

let studentData = []
// ---------------------    Method 1 - Using Promise     ---------------------

const promise = new Promise(( resolve, reject ) => {
    fs.readFile(studentFileName, "utf-8" ,  ( err, data ) => {
        studentData = JSON.parse(data)
    } )
    resolve()
} )
const getData = async (  ) => await promise

app.get('/student/get', async (req, res, next) => {
    getData()
    if(req.query.id){
        const selectedUser = studentData.find(( item ) => item._id === `${req.query.id}` )
        selectedUser ? res.send(selectedUser) : res.send('user not found')
        return
    }
    res.send(studentData)
})

// ---------------------    Method 2 - Using fs promise     ---------------------

const fs2 = fs.promises

const getDataPromise = async (  ) => {
    try {
        const data = await fs2.readFile(studentFileName, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log('------- error : ' , error)
    }
}

app.post('/student/add', async ( req, res ) => {
    studentData = await getDataPromise()
    req.body && studentData.push(req.body)
    // fs.writeFileSync(studentFileName, JSON.stringify(studentData))

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

