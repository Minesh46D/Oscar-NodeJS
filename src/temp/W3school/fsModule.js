const fs = require('fs')
const http = require('http')

 

new Promise((resolve) => resolve())
.then(() => {
    // ---------------------    Open File (create if it doesn't exist)     ---------------------
    fs.open('demofile1.html', 'w', (err, file) => {
        if(err) throw err;
    
    })
})
.then(() => {
    // ---------------------    Write File  (replace all content OR create new file with content if it doesn't exist)   ---------------------
    fs.writeFile('demofile1.html', 'replaced content\n\n', (err) => {
        if(err) throw err;
    
    })
})
.then(() => {
    fs.appendFile('demofile1.html', "<html>\n<body>\n<h1>FS Module</h1>\n<p>Open > Write > Append > Read</p>\n</body>\n</html>" , (err) => {
        if(err) throw err
    
    })
})
.then(() => {
    // ---------------------    Read File     ---------------------
    http.createServer((req, res) => {
    fs.readFile('demofile1.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        return res.end()
    })

}).listen(8080)
})




//     // ---------------------    Delete File     ---------------------
// fs.unlink('demofile1.html', (err) => {
//     if(err) throw err;

// })

// ---------------------    Rename File     ---------------------

fs.rename('demofile1.html', 'demofile2.html', (err) => {
    if(err) throw err;
    console.log('------- file renamed :')
})















    


