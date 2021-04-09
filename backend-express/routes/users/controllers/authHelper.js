const User = require('../models/User')

async function checkUser(user){
    try {
        let uid = user.uid
        let foundUser = await User.findOne({uid})
        console.log("found user", foundUser)
        if (!foundUser){
            let newUser = await new User({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            })
            await newUser.save()
            return newUser
        }
        return foundUser
    } catch (error) {
        return error
    }
}

module.exports = {
    checkUser,
}