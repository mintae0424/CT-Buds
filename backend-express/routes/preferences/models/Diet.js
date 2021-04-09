const mongoose = require('mongoose')

let DietSchema = new mongoose.Schema({
    name: { type: String, trim: true, unique: true,  default: ''},
})

module.exports = mongoose.model('diets', DietSchema)
