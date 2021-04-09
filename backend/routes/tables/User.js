const AWS = require('aws-sdk')

const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDb

if (IS_OFFLINE === 'true'){
    dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:4000'
    })
    console.log(dynamoDb)
} else {
    dynamoDb = new AWS.DynamoDB.DocumentClient()
}

async function newUser(params){
    dynamoDb.put(params, (error, result) => {
        if (error) {
            throw new Error('Could not create user')
        }
        return result
    })
}

async function findUser(params){
    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error)
            throw new Error("Could not get user")
        }
        if (result.Item){
            return result
        } else {
            throw new Error("User not found")
        }
    })
}

module.exports = {
    newUser,
    findUser,
}