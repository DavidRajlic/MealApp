const UserModel = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');
const ReviewModel = require('../models/ReviewModel.js')

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    list: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error when getting Users.', error: err });
        }
    },

    show: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'No such User' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error when getting User.', error: err });
        }
    },

    getReviews: async (req, res) => {
        try {
            const reviews = await ReviewModel.find({ user: req.params.id }).populate('restaurant');

            if (reviews.length === 0) {
                return res.status(404).json({ message: 'Uporabnik nima nobenih mnenj.' });
            }

            res.json(reviews);
        } catch (err) {
            res.status(500).json({ message: 'Napaka pri pridobivanju mnenj uporabnika.', error: err });
        }
    },


    // Create a new user (not for signup)
    create: async (req, res) => {
        try {
            let profileImagePath = null;
            if (req.file) {
              profileImagePath = "/uploads/profile_images/" + req.file.filename;
            }

            const user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                reviews: req.body.reviews,
                trusted_status: req.body.trusted_status,
                profile_image: profileImagePath
            });

            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json({ message: 'Error when creating User', error: err });
        }
    },

    // Update user
    update: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'No such User' });
            }

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.reviews = req.body.reviews || user.reviews;
            user.trusted_status = req.body.trusted_status || user.trusted_status;
            

            if (req.file) {
              user.profile_image = "/uploads/profile_images/" + req.file.filename;
            }

            const updatedUser = await user.save();
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: 'Error when updating User.', error: err });
        }
    },

    remove: async (req, res) => {
        try {
            await UserModel.findByIdAndDelete(req.params.id);
            res.status(204).end();
        } catch (err) {
            res.status(500).json({ message: 'Error when deleting the User.', error: err });
        }
    },



    signup: async (req, res) => {
        try {
            const { name, email, password, confirm } = req.body;

            // Check if passwords match
            if (password !== confirm) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            let profileImagePath = null;
            if (req.file) {
              profileImagePath = "/uploads//profile_images/" + req.file.filename;
            }


            const user = new UserModel({
                name,
                email,
                password,
                profile_image: profileImagePath
            });

            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json({ message: 'Error when signing up', error: err });
        }
    },


    login: async (req, res) => {
        try {
            const user = await UserModel.authenticate(req.body.email, req.body.password);

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET
            );


            return res.json({ token, user: user });
        } catch (err) {
            return res.status(401).json({ message: err.message || 'Authentication failed.' });
        }
    },


    logout: async (req, res) => {
        try {
            if (req.session) {
                await new Promise((resolve, reject) => {
                    req.session.destroy((err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
                res.status(200).json({ message: 'Logged out' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error when logging out', error: err });
        }
    },

    // Profile (get logged-in user's info)
    profile: async (req, res) => {
        try {
            const user = await UserModel.findById(req.session.userId);
            if (!user) {
                return res.status(403).json({ message: 'Not authorized' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error when getting profile', error: err });
        }
    },


     updateTrustStatus: async function (req, res) {
        const userId = req.params.id;
        const newStatus = parseInt(req.body.trusted_status);

        if (!Number.isInteger(newStatus) || newStatus < 1 || newStatus > 5) {
            return res.status(400).json({ message: 'trustStatus must be an integer between 1 and 5.' });
        }

        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { trusted_status: newStatus },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            return res.json({
                message: 'Trust status updated successfully.',
                user: {
                    id: updatedUser._id,
                    trusted_status: updatedUser.trusted_status
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating trust status.',
                error: error.message || error
            });
        }
    }
};
