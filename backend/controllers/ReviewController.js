var ReviewModel = require('../models/ReviewModel.js');
const badWords = require('../utils/bad_words.json')
function containsBadWords(text) {
    const lower = text.toLowerCase();
    return badWords.some(word => lower.includes(word));
}

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
            if (containsBadWords(req.body.comment)) {
                return res.status(400).json({ message: "Komentar vsebuje neprimerno vsebino." });
            }
            const imagePaths = req.files ? req.files.map(file => "/images/" + file.filename) : [];

            const review = new ReviewModel({
                user: req.body.user,
                restaurant: req.body.restaurant,
                rating: req.body.rating,
                comment: req.body.comment,
                anonymous: req.body.anonymous,
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
                        comment: req.body.comment,
                        anonymous: req.body.anonymous
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
    },

    /**
     * ReviewController.vote()
     */
    vote: async function (req, res) {
        const userId = req.user?.userId;
        const reviewId = req.params.id;
        const value = parseInt(req.body.value);

        if (!userId) {
            return res.status(401).json({ message: "User must be logged in to vote." });
        }

        if (![1, -1].includes(value)) {
            return res.status(400).json({ message: "Vote must be 1 or -1." });
        }

        try {
            const review = await ReviewModel.findById(reviewId);
            if (!review) return res.status(404).json({ message: "Review not found." });

            const existingVoteIndex = review.votes.findIndex(v => v.user.toString() === userId);

            if (existingVoteIndex !== -1) {
                const existingVote = review.votes[existingVoteIndex];

                if (existingVote.value === value) {
                    review.votes.splice(existingVoteIndex, 1);
                } else {
                    review.votes[existingVoteIndex].value = value;
                }
            } else {
                review.votes.push({ user: userId, value: value });
            }

            await review.save();

            const upvotes = review.votes.filter(v => v.value === 1).length;
            const downvotes = review.votes.filter(v => v.value === -1).length;

            return res.json({
                message: "Vote updated.",
                upvotes,
                downvotes,
                userVote: review.votes.find(v => v.user.toString() === userId)?.value || 0
            });

        } catch (err) {
            return res.status(500).json({
                message: "Error while voting.",
                error: err.message || err
            });
        }
    }



};
