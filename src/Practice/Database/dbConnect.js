const mongoose = require('mongoose')

module.exports = dbconnect = async (  ) => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log('------- Mongodb connection failed : ' , error )
    }
} 