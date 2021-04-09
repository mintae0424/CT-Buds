const { createUser, retrieveUser } = require('./authHelper')
const AWS = require('aws-sdk')

const IS_OFFLINE = process.env.IS_OFFLINE;
const USERS_TABLE = process.env.USERS_TABLE

module.exports = {
    signup: (req, res) => {
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
    },

    getUser: (req, res) => {

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
    }

    // signup: async (req, res) => {
    //     try {
    //         const { userId, name } = req.body
    //         if ( typeof userId !== 'string'){
    //             res.status(400).json({ error: '"userId" must be a string'})
    //         } else if (typeof name !== 'string') {
    //             res.status(400).json({ error: '"name" must be a string'})
    //         }
    //         let result = await createUser(userId, name)
    //         let {userId, name} = result.Item
    //         res.status(200).json({userId, name})
    //     } catch (error) {
    //         res.status(400).json({error: error.message})
    //     }
    // },

    // getUser: async (req, res) => {
    //     try {
    //         const userId = req.params.userId
    //         let result = await retrieveUser(userId)
    //         let {userId, name} = result.Item
    //         res.status(200).json({userId, name})
    //     } catch (error) {
    //         res.status(400).json({error: error.message})
    //     }
    // }
}