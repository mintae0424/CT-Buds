const createError = require('http-errors')
const serverless = require('serverless-http')
const express = require('express')
// const path = require('path')
// const cookieParser = require('cookie-parser')
// const logger = require('morgan')
// require('dotenv').config()
// const cors = require('cors')

// const AWS = require('aws-sdk')
// let indexRouter = require('./routes/index')
// let userRouter = require('./routes/users/users')

const app = express()

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')


// app.use(cors())
// app.use(logger('dev'))
// app.use(express.json({ strict: false}))
// app.use(express.urlencoded({ extedned: false }))
// app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter);
// app.use('/users', userRouter)

// app.use(function(req, res, next) {
//     next(createError(404))
// })

// app.use(function(err, req, res, next) {
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}

//     res.status(err.status || 500);
//     res.render('error')
// })

// const IS_OFFLINE = process.env.IS_OFFLINE;
// const USERS_TABLE = process.env.USERS_TABLE

// let dynamoDb

// if (IS_OFFLINE === 'true'){
//     dynamoDb = new AWS.DynamoDB.DocumentClient({
//         region: 'localhost',
//         endpoint: 'http://localhost:4000'
//     })
//     console.log(dynamoDb)
// } else {
//     dynamoDb = new AWS.DynamoDB.DocumentClient()
// }


app.get('/', function(req, res){
    res.send("Hello World!")
})

// app.get('/users/:userId', function(req, res){
//     const params = {
//         TableName: USERS_TABLE,
//         Key: {
//             userId: req.params.userId
//         },
//     }

//     dynamoDb.get(params, (error, result) => {
//         if (error) {
//             console.log(error)
//             res.status(400).json({ error: "Could not get user"})
//         }
//         if (result.Item){
//             const {userId, name} = result.Item
//             res.json({ userId, name})
//         } else {
//             res.status(404).json({ error: "User not found" })
//         }
//     })
// })

// app.post('/users', function(req, res) {
//     const { userId, name } = req.body
//     if ( typeof userId !== 'string'){
//         res.status(400).json({ error: '"userId" must be a string'})
//     } else if (typeof name !== 'string') {
//         res.status(400).json({ error: '"name" must be a string'})
//     }

//     const params = {
//         TableName: USERS_TABLE,
//         Item: {
//             userId: userId,
//             name: name,
//         },
//     }

//     dynamoDb.put(params, (error) => {
//         if (error) {
//             console.log(error)
//             res.status(400).json({ error: 'Could not create user'})
//         }
//         res.json({ userId, name})
//     })
// })

module.exports.handler = serverless(app)