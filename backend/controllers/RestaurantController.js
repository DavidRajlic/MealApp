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
            const restaurant = new RestaurantModel({
                name: req.body.name,
                location: req.body.location,
                reviews: req.body.reviews || [],
                averageRating: req.body.averageRating || 0
            });

            const savedRestaurant = await restaurant.save();
            return res.status(201).json(savedRestaurant);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating restaurant',
                error: err
            });
        }
    },

    /**
     * RestaurantController.update()
     */
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
