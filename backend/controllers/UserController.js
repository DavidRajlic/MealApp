const UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: async function (req, res) {
        try {
            const users = await UserModel.find();
            return res.json(users);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting User.',
                error: err
            });
        }
    },

    /**
     * UserController.show()
     */
    show: async function (req, res) {
        const id = req.params.id;
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(user);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting User.',
                error: err
            });
        }
    },

    /**
     * UserController.create()
     */
    create: async function (req, res) {
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            reviews: req.body.reviews,
            trusted_status: req.body.trusted_status
        });

        try {
            const savedUser = await user.save();
            return res.status(201).json(savedUser);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating User',
                error: err
            });
        }
    },

    /**
     * UserController.update()
     */
    update: async function (req, res) {
        const id = req.params.id;
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.reviews = req.body.reviews || user.reviews;
            user.trusted_status = req.body.trusted_status || user.trusted_status;

            const updatedUser = await user.save();
            return res.json(updatedUser);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when updating User.',
                error: err
            });
        }
    },

    /**
     * UserController.remove()
     */
    remove: async function (req, res) {
        const id = req.params.id;
        try {
            await UserModel.findByIdAndRemove(id);
            return res.status(204).json();
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the User.',
                error: err
            });
        }
    }
};
