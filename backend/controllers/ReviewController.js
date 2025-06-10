var ReviewModel = require('../models/ReviewModel.js');

/**
 * ReviewController.js
 *
 * @description :: Server-side logic for managing Reviews.
 */
module.exports = {

    /**
     * ReviewController.list()
     */
    list: async function (req, res) {
        try {
            const filter = {};
            if (req.query.restaurant) filter.restaurant = req.query.restaurant;
            if (req.query.user) filter.user = req.query.user;
    
            const reviews = await ReviewModel.find(filter)
                .populate('user', 'name')
                .populate('restaurant', 'name');
    
            return res.json(reviews);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting reviews.',
                error: err
            });
        }
    },
    
    show: async function (req, res) {
        const id = req.params.id;
    
        try {
            const review = await ReviewModel.findOne({ _id: id })
                .populate('user', 'name')
                .populate('restaurant', 'name');
    
            if (!review) {
                return res.status(404).json({
                    message: 'No such review'
                });
            }
    
            return res.json(review);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting review.',
                error: err
            });
        }
    },    

    /**
     * ReviewController.create()
     */
    create: async function (req, res) {
        try {
            if (req.files && req.files.length > 5) {
                return res.status(400).json({ message: "Največ 5 slik!" });
            }

            const imagePaths = req.files ? req.files.map(file => "/uploads/" + file.filename) : [];

            const review = new ReviewModel({
                user: req.body.user,
                restaurant: req.body.restaurant,
                rating: req.body.rating,
                comment: req.body.comment,
                images: imagePaths
            });

            const savedReview = await review.save();
            return res.status(201).json(savedReview);

        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating review',
                error: err
            });
        }
    },

    /**
     * ReviewController.update()
     */
    update: async function (req, res) {
        const id = req.params.id;
    
        try {
            const updatedReview = await ReviewModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        rating: req.body.rating,
                        comment: req.body.comment
                    }
                },
                { new: true, runValidators: true } // returns updated doc + triggers validation
            )
            .populate('user', 'username')
            .populate('restaurant', 'name');
    
            if (!updatedReview) {
                return res.status(404).json({
                    message: 'No such review'
                });
            }
    
            return res.json(updatedReview);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when updating review.',
                error: err
            });
        }
    },
    
    /**
     * ReviewController.remove()
     */
    remove: async function (req, res) {
        const id = req.params.id;
    
        try {
            const review = await ReviewModel.findByIdAndDelete(id);
    
            if (!review) {
                return res.status(404).json({
                    message: 'No such review to delete'
                });
            }
    
            return res.status(200).json({
                message: 'Review deleted successfully',
                deletedReview: review
            });
        } catch (err) {
            // Explicitly log the error if you want to debug invalid ObjectId, etc.
            console.error('Delete error:', err);
            return res.status(500).json({
                message: 'Error when deleting the review.',
                error: err.message || err
            });
        }
    }
    
};
