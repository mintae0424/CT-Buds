const Menu = require("../models/Menu")
const Restaurant = require("../models/Restaurant")

module.exports = {
    addRestaurant: async (req, res) => {
        let info = req.body

        try {
            console.log(info._id)
            if (info._id) {
                let foundRestaurant = await Restaurant.findById(info._id)
                foundRestaurant.name = info.name
                foundRestaurant.email = info.email
                foundRestaurant.address.street = info.street
                foundRestaurant.address.city = info.city
                foundRestaurant.address.state = info.state
                foundRestaurant.address.zip = info.zip
                foundRestaurant.timeInfo = info.timeInfo
                let savedRestaurant = await foundRestaurant.save()
                res.status(200).json({restaurant: savedRestaurant})
            } else {
                let newRestaurant = await new Restaurant({
                    name: info.name,
                    email: info.email,
                    address: {
                        street: info.street,
                        city: info.city,
                        state: info.state,
                        zip: info.zip
                    },
                    timeInfo: info.timeInfo
                })
                let savedRestaurant = await newRestaurant.save()
                res.status(200).json({restaurant: savedRestaurant})
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllRestaurants: async (req, res) => {
        try {
            allRestaurants = await Restaurant.find({})
            res.status(200).json({
                restaurants: allRestaurants
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getById: async(req, res) => {
        let id = req.query.id
        try {
            console.log(id)
            let foundRestaurant = await Restaurant.findById(id)
            let populatedRestaurant = await Restaurant.populate(foundRestaurant, 'menu_ids')
            console.log(populatedRestaurant)
            res.status(200).json({restaurant: populatedRestaurant})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    addCategory: async(req, res) => {
        console.log(req.body)
        let id = req.body.id
        let name = req.body.name
        let order = req.body.order
        try {
            let foundRestaurant = await Restaurant.findById(id)
            let newCategory = {
                name: name,
                order: order
            }
            await foundRestaurant.menu_categories.push(newCategory)
            let savedRestaurant = await foundRestaurant.save()
            res.status(200).json(savedRestaurant.menu_categories)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    editCategory: async(req, res) => {
        let id = req.body.id
        let categories = req.body.categories
        try {
            let foundRestaurant = await Restaurant.findById(id)
            foundRestaurant.menu_categories = categories
            await foundRestaurant.save()
            res.status(200).json(foundRestaurant.menu_categories)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    addMenuItem: async(req, res) => {
        let menuObj = req.body
        try {
            if (menuObj._id === '') {
                let newObj = {
                    name: menuObj.name,
                    restaurant_id: menuObj.restaurant_id,
                    allergy_id: menuObj.allergy_id,
                    diet_id: menuObj.diet_id,
                    cuisine_id: menuObj.cuisine_id,
                    price: menuObj.price,
                    category: {
                        name: menuObj.category.name,
                        id: menuObj.category.id
                    },
                    description: menuObj.description,
                    meal_time: menuObj.meal_time,
                    calories: {
                        low: menuObj.calories.low,
                        high: menuObj.calories.high,
                    }
                }
                let createdMenuItem = await new Menu(newObj)
                let savedMenuItem = await createdMenuItem.save()
                let foundRestaurant = await Restaurant.findById(menuObj.restaurant_id)
                foundRestaurant.menu_ids.push(savedMenuItem._id)
                let savedRestaurant = await foundRestaurant.save()
                let populatedRestaurant = await Restaurant.populate(savedRestaurant, 'menu_ids')
                res.status(200).json(populatedRestaurant.menu_ids)
            } else {
                let foundMenuItem = await Menu.findById(menuObj._id)
                foundMenuItem.name = menuObj.name
                foundMenuItem.allergy_id = menuObj.allergy_id
                foundMenuItem.diet_id = menuObj.diet_id
                foundMenuItem.cuisine_id = menuObj.cuisine_id
                foundMenuItem.price = menuObj.price
                foundMenuItem.meal_time = menuObj.meal_time
                foundMenuItem.category = menuObj.category
                foundMenuItem.description = menuObj.description
                foundMenuItem.calories = menuObj.calories
                await foundMenuItem.save()
                let foundRestaurant = await Restaurant.findById(menuObj.restaurant_id)
                let populatedRestaurant = await Restaurant.populate(foundRestaurant, 'menu_ids')
                res.status(200).json(populatedRestaurant.menu_ids)
            }
            
            
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}