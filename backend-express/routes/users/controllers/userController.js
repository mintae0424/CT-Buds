const { checkUser } = require('./authHelper')
const verifier = require('firebase-token-verifier')
const User = require('../models/User')

const projectId = 'ct-buds'

module.exports = {
    setUser: async (req, res) => {
        try {
            const token = await req.headers.authorization
            if (!token) {
                res.status(401)
            }
            const validated = await verifier.validate(token, projectId)
            if (!validated){
                res.status(401)
            }
            let uid = req.body.uid
            let foundUser = await User.findOne({uid})
            console.log("found user", foundUser)
            if (foundUser === null){
                console.log('hitting')
                let newUser = await new User({
                    uid: req.body.uid,
                    email: req.body.email,
                    displayName: req.body.displayName
                })
                console.log(newUser)
                let savedUser = await newUser.save()
                console.log(savedUser)
                res.status(200).json({
                    user: savedUser
                })
            } else {
                res.status(200).json({
                    user: foundUser
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message
            })
        }
    },
    updatePreference: async (req, res) => {
        console.log(req.body)
        let id = req.body.id
        let allergy_id = req.body.allergy_id
        let diet_id = req.body.diet_id
        let cuisine_id = req.body.cuisine_id
        try {
            let foundUser = await User.findById(id)
            foundUser.allergy_id = allergy_id
            foundUser.diet_id = diet_id
            foundUser.cuisine_id = cuisine_id
            let savedUser = await foundUser.save()
            console.log(savedUser)
            res.status(200).json({
                user: savedUser
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}