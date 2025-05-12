const RestaurantModel = require('../models/RestaurantModel.js');

/**
 * RestaurantController.js
 *
 * @description :: Server-side logic for managing Restaurants.
 */
module.exports = {

    /**
     * RestaurantController.list()
     */
    list: async function (req, res) {
        try {
            const restaurants = await RestaurantModel.find();
            return res.json(restaurants);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting restaurants.',
                error: err
            });
        }
    },

    /**
     * RestaurantController.show()
     */
    show: async function (req, res) {
        try {
            const id = req.params.id;
            const restaurant = await RestaurantModel.findById(id);
            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant'
                });
            }
            return res.json(restaurant);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting restaurant.',
                error: err
            });
        }
    },

    /**
     * RestaurantController.create()
     */
    create: async function (req, res) {
        try {
            const restaurantsData = req.body;
            const savedRestaurants = await RestaurantModel.insertMany(restaurantsData);
            
            return res.status(201).json(savedRestaurants);
        } catch (err) {
            console.error('Error when creating restaurants:', err);
            return res.status(500).json({
                message: 'Error when creating restaurants',
                error: err
            });
        }
    },
    

    update: async function (req, res) {
        try {
            const id = req.params.id;
            const restaurant = await RestaurantModel.findById(id);
            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant'
                });
            }
            restaurant.name = req.body.name || restaurant.name;
            restaurant.price = req.body.price || restaurant.price;  
            restaurant.additional_payment = req.body.additional_payment || restaurant.additional_payment;  // Posodobi dodatno plačilo
            restaurant.location = req.body.location || restaurant.location;
            restaurant.reviews = req.body.reviews || restaurant.reviews;
            restaurant.averageRating = req.body.averageRating || restaurant.averageRating;

            const updatedRestaurant = await restaurant.save();
            return res.json(updatedRestaurant);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when updating restaurant.',
                error: err
            });
        }
    },



    /**
     * RestaurantController.remove()
     */
    remove: async function (req, res) {
        try {
            const id = req.params.id;
            await RestaurantModel.findByIdAndDelete(id);
            return res.status(204).json();
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the restaurant.',
                error: err
            });
        }
    }
};
