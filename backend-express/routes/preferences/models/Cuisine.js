const mongoose = require('mongoose')

let CuisineSchema = new mongoose.Schema({
    name: { type: String, trim: true, unique: true,  default: ''},
})

module.exports = mongoose.model('cuisines', CuisineSchema)
