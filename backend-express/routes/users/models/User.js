const mongoose = require('mongoose')
const moment = require('moment')
const now = moment()

let UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        default: ''
    },
    displayName: {
        type: String,
        trim: true,
        required: true,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require: true,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    allergy_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'allergies',
    }],
    diet_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'diets',
    }],
    cuisine_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'cuisines',
    }],
    order_history: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'orders'
    }],
    timestamp: {
        type: String,
        default: now.format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    username: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('users', UserSchema)