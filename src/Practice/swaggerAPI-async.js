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

// let studentData = []
// const promise = new Promise(( resolve, reject ) => {
//     fs.readFile(studentFileName, "utf-8" ,  ( err, data ) => {
//         // console.log('------- data : ' , JSON.parse(data))
//         studentData = JSON.parse(data)
//     } )
// } )
// const getData = async (  ) => await promise

const fs2 = fs.promises

const getData = async (  ) => {
    try {
        const data = await fs2.readFile(studentFileName, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log('------- error : ' , error)
    }
}

app.get('/student/get', async (req, res, next) => {
    // const studentData = JSON.parse(fs.readFileSync(studentFileName))
    // getData()
    const studentData = await getData()
    console.log('------- studentData : ' , studentData)
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
        fs.writeFileSync(userFileName, JSON.stringify(userData))
        res.send(req.file)
        return
    }
    res.send('invalid data')
} )

