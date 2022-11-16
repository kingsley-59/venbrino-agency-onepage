const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).json({message: 'Server is still under construction.'})
})

module.exports = router