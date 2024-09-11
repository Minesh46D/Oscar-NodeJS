export const resStatus = ( code, res, error , message = null, ...data ) => {
    let response = ''
    response = code === 200 && res.status( code ).json({ 
        status: true, 
        message: message ? message : "Success",
        ...data[0]
    })
    response = code === 400 && res.status( code ).json({ 
        status: false, message: message ? message : 'Bad Request' 
    })
    response = code === 401 && res.status( code ).json({ 
        status: false, message: message ? message : 'Unauthorized' 
    })
    response = code === 409 && res.status( code ).json({ 
        status: false, error: error, message: message ? message : 'Schema Conflict'
    })
    response = code === 500 && res.status( code ).json({ 
        status: false, message: message ? message : 'Internal Server Error' 
    })
}