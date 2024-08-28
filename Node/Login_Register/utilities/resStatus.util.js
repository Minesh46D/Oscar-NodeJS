export const resStatus = ( code, res, message = null ) => {
    let response = ''
    response = code === 200 && res.status( code ).json({ 
        status: true, message: message ? message : "Success"
    })
    response = code === 400 && res.status( code ).json({ 
        status: false, message: message ? message : 'Bad Request' 
    })
    response = code === 401 && res.status( code ).json({ 
        status: false, message: message ? message : 'Unauthorized' 
    })
    response = code === 500 && res.status( code ).json({ 
        status: false, message: message ? message : 'Internal Server Error' 
    })
}