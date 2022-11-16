const express = require('express')
const path = require('path')

const apiRoutes = require('./routes')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.static('public'))

app.use('/api', apiRoutes)

app.use('/', express.static(path.join(__dirname, 'public', )))

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})