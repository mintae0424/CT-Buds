var express = require('express');
var router = express.Router();
const userController = require('./controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/set-user', userController.setUser)

router.post('/update-pref', userController.updatePreference)

module.exports = router;
