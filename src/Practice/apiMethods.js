const express = require('express')
const app = express()
const port = 5000

app.use(express.json())             // app level
app.listen(port, () => {
    console.log('------- server start :', port)
})

app.get('/', (req, res, next) => {
    res.send(`<h1>hello!</h1>\n<p>id: ${req.query.id} name: ${req.query.name}</p>`)
    console.log('------- req : ' , req.body)
})

app.get('/app/:id/:name', (req, res) => {
    res.send(req.params)
    console.log('------- querry : ' , req.params)
})