var express = require('express');
var router = express.Router();
const restaurantController = require('./controllers/restaurantController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', restaurantController.addRestaurant)

router.get('/getall', restaurantController.getAllRestaurants)

router.get('/getById', restaurantController.getById)

router.post('/add-category', restaurantController.addCategory)

router.post('/edit-category', restaurantController.editCategory)

router.post('/add-menu-item', restaurantController.addMenuItem)

module.exports = router;
