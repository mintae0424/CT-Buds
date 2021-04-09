const { newUser, findUser } = require('../tables/User')

const USERS_TABLE = process.env.USERS_TABLE

async function createUser(userId, name){
    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: userId,
            name: name,
        },
    }
    return await newUser(params)
}

async function retrieveUser(userId){
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId
        },
    }

    return await findUser(params)
}

module.exports = {
    createUser,
    retrieveUser,
}