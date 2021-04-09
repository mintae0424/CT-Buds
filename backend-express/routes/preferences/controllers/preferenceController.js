const Allergy = require('../models/Allergy')
const Cuisine = require('../models/Cuisine')
const Diet = require('../models/Diet')

module.exports = {
    createPreference: async (req, res) => {
        let category = req.body.category
        let name = req.body.name
        console.log(category, name)
        try {
                if (category === 'Allergy'){
                    let newAllergy = await new Allergy({
                        name: name
                    })
                    await newAllergy.save()
                    res.status(200).json({category: category, name: name})
                } else if (category === 'Cuisine'){
                    let newCuisine = await new Cuisine({
                        name: name
                    })
                    await newCuisine.save()
                    res.status(200).json({category: category, name: name})
                } else if (category === "Diet"){
                    console.log("hitting")
                    let newDiet = await new Diet({
                        name: name
                    })
                    await newDiet.save()
                    res.status(200).json({category: category, name: name})

                } else {
                    res.status(400).json({message: "Preference type not satisfied."})
                }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllPreferences: async (req, res) => {
        try {
            allAllergies = await Allergy.find({})
            allCuisines = await Cuisine.find({})
            allDiets = await Diet.find({})
            res.status(200).json({
                allergies: allAllergies,
                cuisines: allCuisines,
                diets: allDiets
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}