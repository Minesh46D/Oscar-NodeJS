const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/demo')
.then((  ) => console.log('------- server connected :') )
.catch(( err ) => console.log('------- error : ' , err) )