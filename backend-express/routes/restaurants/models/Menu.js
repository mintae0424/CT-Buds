const mongoose = require('mongoose')

let MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        default: ''
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'restaurants',
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
    price: {
        type: Number,
        default: 0
    },
    meal_time: {
        breakfast: {type: Boolean, default: false},
        lunch: {type: Boolean, default: false},
        dinner: {type: Boolean, default: false}
    },
    category: {
        name: { type: String, trim: true },
        id: { type: String },
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    calories: {
        low: {type: Number, default: 0},
        high: {type: Number, default: 0}
    },
    orders: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('menu-items', MenuItemSchema)