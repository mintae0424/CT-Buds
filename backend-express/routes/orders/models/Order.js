const mongoose = require('mongoose')
const moment = require('moment')
const now = moment()

let OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    menu_items: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'menu-items'
    }],
    amount: {
        type: Number,
        default: 0
    },
    processed: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: String,
        default: now.format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
})

module.exports = mongoose.model('orders', OrderSchema)