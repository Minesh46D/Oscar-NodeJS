export const tryCatch = async (  ) => {
    return ( req, res, next ) => {
        try {
            
        } catch (error) {
            return res.status(200).json({status: false, error: 'internal server error'})
        }
    } 
} 