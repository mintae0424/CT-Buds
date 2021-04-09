const serverless = require('serverless-http')
const express = require('express')
// const userController = require('./controllers/userController')
const AWS = require('aws-sdk')

const user = express()

const IS_OFFLINE = process.env.IS_OFFLINE;
const USERS_TABLE = process.env.USERS_TABLE

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

// module.exports = {
//     signup: async (req, res) => {
//         const { userId, name } = req.body
//         if ( typeof userId !== 'string'){
//             res.status(400).json({ error: '"userId" must be a string'})
//         } else if (typeof name !== 'string') {
//             res.status(400).json({ error: '"name" must be a string'})
//         }

//         const params = {
//             TableName: USERS_TABLE,
//             Item: {
//                 userId: userId,
//                 name: name,
//             },
//         }

//         dynamoDb.put(params, (error) => {
//             if (error) {
//                 console.log(error)
//                 res.status(400).json({ error: 'Could not create user'})
//             }
//             res.json({ userId, name})
//         })
//     },
//     getUser: async (req, res) => {
//         const params = {
//             TableName: USERS_TABLE,
//             Key: {
//                 userId: req.params.userId
//             },
//         }
    
//         dynamoDb.get(params, (error, result) => {
//             if (error) {
//                 console.log(error)
//                 res.status(400).json({ error: "Could not get user"})
//             }
//             if (result.Item){
//                 const {userId, name} = result.Item
//                 res.json({ userId, name})
//             } else {
//                 res.status(404).json({ error: "User not found" })
//             }
//         })
//     }
// }

user.get('/users/:userId', function(req, res){
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId
        },
    }

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error)
            res.status(400).json({ error: "Could not get user"})
        }
        if (result.Item){
            const {userId, name} = result.Item
            res.json({ userId, name})
        } else {
            res.status(404).json({ error: "User not found" })
        }
    })
})

user.post('/users', function(req, res) {
    const { userId, name } = req.body
    if ( typeof userId !== 'string'){
        res.status(400).json({ error: '"userId" must be a string'})
    } else if (typeof name !== 'string') {
        res.status(400).json({ error: '"name" must be a string'})
    }

    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: userId,
            name: name,
        },
    }

    dynamoDb.put(params, (error) => {
        if (error) {
            console.log(error)
            res.status(400).json({ error: 'Could not create user'})
        }
        res.json({ userId, name})
    })
})

module.exports.handler = serverless(user)