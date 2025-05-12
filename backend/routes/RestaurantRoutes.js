var express = require('express');
var router = express.Router();
var RestaurantController = require('../controllers/RestaurantController.js');

/*
 * GET all restaurants
 */
router.get('/', RestaurantController.list);

/*
 * GET a single restaurant by ID
 */
router.get('/:id', RestaurantController.show);

/*
 * POST to create a new restaurant
 */
router.post('/', RestaurantController.create);

/*
 * PUT to update a restaurant by ID
 */
router.put('/:id', RestaurantController.update);

/*
 * DELETE a restaurant by ID
 */
router.delete('/:id', RestaurantController.remove);

module.exports = router;
