const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/demo')
.then((  ) => console.log('------- server connected :') )
.catch(( err ) => console.log('------- error : ' , err) )