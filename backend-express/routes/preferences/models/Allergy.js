const mongoose = require('mongoose')

let AllergySchema = new mongoose.Schema({
    name: { type: String, trim: true, unique: true,  default: ''},
})

module.exports = mongoose.model('allergies', AllergySchema)
