var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
let cors = require('cors')
let mongoose = require('mongoose')

const url = 'mongodb+srv://buds-admin:'+process.env.DB_PW+'@budsdb.iffcq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
  .then(()=> {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.error('MongoDB connection error. \n${err}')
  })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
let preferencesRouter = require('./routes/preferences/preferences')
let restaurantsRouter = require('./routes/restaurants/restaurants')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/preferences', preferencesRouter)
app.use('/api/restaurants', restaurantsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
