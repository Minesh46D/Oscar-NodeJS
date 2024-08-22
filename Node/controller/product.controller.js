export const addProduct = ( req, res ) => {
    res.status(200).json({status: true, message: 'product added', data: req.body})
} 