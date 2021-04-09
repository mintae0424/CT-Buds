var express = require('express');
var router = express.Router();
const preferenceController = require('./controllers/preferenceController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', preferenceController.createPreference)

router.get('/getall', preferenceController.getAllPreferences)

module.exports = router;
