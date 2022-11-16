const mongoose = require('mongoose')


const ContactSchema = mongoose.Schema({

}, { timeStamp: true })


module.exports = mongoose.model('Contact', ContactSchema)