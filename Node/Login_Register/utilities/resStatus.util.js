export const resStatus = ( errorCode, res, error = null , message = null, ...data ) => {
    let response = ''
    response = errorCode === 200 && res.status( errorCode ).json({ 
        status: true, 
        message: message ? message : "Success",
        ...data[0]
    })
    response = errorCode === 400 && res.status( errorCode ).json({ 
        status: false, message: error ? error : 'Bad Request' 
    })
    response = errorCode === 401 && res.status( errorCode ).json({ 
        status: false, message: error ? error : 'Unauthorized' 
    })
    response = errorCode === 409 && res.status( errorCode ).json({ 
        status: false, error: error, message: message ? message : 'Schema Conflict'
    })
    response = errorCode === 500 && res.status( errorCode ).json({ 
        status: false, message: error ? error : 'Internal Server Error' 
    })
}