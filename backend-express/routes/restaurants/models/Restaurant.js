const mongoose = require('mongoose')
const moment = require('moment')
const now = moment()

let RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
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
    address: {
        street: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        city: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        state: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        zip: {
            type: String,
            require: true,
            default: ''
        }
    },
    user_ids: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],
    menu_ids: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'menu-items'
    }],
    menu_categories: [{
        name: { type: String, trim: true },
        order: { type: Number, default: 0 }
    }],
    timeInfo: {
        breakfast: {
            closed: { type: Boolean, default: false},
            start: { type: String, default: '00:00'},
            end: { type: String, default: '00:00'},
        },
        lunch: {
            closed: { type: Boolean, default: false},
            start: { type: String, default: '00:00'},
            end: { type: String, default: '00:00'},
        },
        dinner: {
            closed: { type: Boolean, default: false},
            start: { type: String, default: '00:00'},
            end: { type: String, default: '00:00'},
        }
    },
    timestamp: {
        type: String,
        default: now.format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
})

module.exports = mongoose.model('restaurants', RestaurantSchema)