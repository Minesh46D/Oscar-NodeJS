export const resStatus = ( code, res ) => {
    let response = ''
    response = code === 200 && res.status( code ).json({ status: true, message: 'Success' })
    response = code === 400 && res.status( code ).json({ status: false, message: 'Bad Request' })
    response = code === 401 && res.status( code ).json({ status: false, message: 'Unauthorized' })
}