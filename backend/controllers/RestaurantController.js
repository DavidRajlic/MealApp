const RestaurantModel = require('../models/RestaurantModel.js');
const ReviewModel = require('../models/ReviewModel.js')

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

    getReviews: async (req, res) => {
        try {
            const reviews = await ReviewModel.find({ restaurant: req.params.id }).populate('user');

            if (reviews.length === 0) {
                return res.status(404).json({ message: 'Uporabnik nima nobenih mnenj.' });
            }

            res.json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Napaka pri pridobivanju mnenj uporabnika.', error: err });
        }
    },

    /**
     * RestaurantController.create()
     */
    create: async function (req, res) {
        try {
            const restaurantData = req.body;
            const newRestaurant = new RestaurantModel({
                name: restaurantData.name,
                price: restaurantData.price,
                additional_payment: restaurantData.additional_payment,
                location: {
                    latitude: restaurantData.location.latitude,
                    longitude: restaurantData.location.longitude
                },
                image: restaurantData.image,
                averageRating: restaurantData.averageRating || 0,
                reviews: restaurantData.reviews || []
            });


            const savedRestaurant = await newRestaurant.save();
            return res.status(201).json(savedRestaurant);
        } catch (err) {
            console.error('Error when creating restaurant:', err);
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
            restaurant.price = req.body.price || restaurant.price;
            restaurant.additional_payment = req.body.additional_payment || restaurant.additional_payment;
            restaurant.location = req.body.location || restaurant.location;
            restaurant.image = req.body.image || restaurant.image;
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