const User = require('../models/User')

async function checkUser(user){
    try {
        let uid = user.uid
        let foundUser = await User.findOne({uid})
        console.log("found user", foundUser)
        if (foundUser === null){
            let newUser = await new User({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            })
            let savedUser = await newUser.save()
            console.log(savedUser)
            return savedUser
        } else {
            return foundUser
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    checkUser,
}