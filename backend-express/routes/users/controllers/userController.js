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
            let foundUser = await checkUser(req.body)
            if (!foundUser){
                res.status(401)
            } else {

            }
            res.status(200).json({
                user: foundUser
            })
        } catch (error) {
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