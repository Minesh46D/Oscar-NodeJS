const getStudentData = async ( req, res ) => {
    const {id} = req.query
    try {
        id ? res.send(await student.find({_id: new Types.ObjectId(id)})) : res.send(await student.find())
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error\n', error)
    }
}
const addStudentData = async ( req, res ) => {
    try {
        Object.keys(req.body).length ? res.send(await student.create(req.body)) : res.send('body is invalid')
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error\n',  error)
    }
}

const updateStudentData = async ( req, res ) => {
    const{id} = req.query
    try {
        id ? res.send(await student.updateOne({_id: new Types.ObjectId(id)}, {$set: req.body})) : res.send('id not valid')
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error: \n', error)
    }
}

const deleteStudentData = async ( req, res ) => {
    const {id} = req.query
    try {
        id ? res.send(await student.deleteOne({_id: new Types.ObjectId(id)})) : res.send('id not valid')
    } catch (error) {
        console.log('------- error : ' , error)
        res.send('error: \n', error)
    }
}

module.exports = {getStudentData, addStudentData, updateStudentData, deleteStudentData}