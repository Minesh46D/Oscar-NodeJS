import mongoose from "mongoose"

const dbConnect = async (  ) =>  {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}`)
    } catch (error) {
        console.log('------- Mongodb connection failed : ' , error )
    }
}

export default dbConnect