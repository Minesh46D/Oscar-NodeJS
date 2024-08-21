import express from 'express'

const router = express.Router()

router.get('/add', ( req, res ) => {
    res.send('add')
} )


export default router