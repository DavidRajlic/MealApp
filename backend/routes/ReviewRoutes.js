const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
var authenticateUser = require('../middleware/auth.js');
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filter reviews by user ID
 *       - in: query
 *         name: restaurant
 *         schema:
 *           type: string
 *         description: Filter reviews by restaurant ID
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/', ReviewController.list);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: A review
 *       404:
 *         description: Review not found
 */
router.get('/:id', ReviewController.show);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review with images
 *     tags: [Reviews]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - restaurant
 *               - rating
 *             properties:
 *               user:
 *                 type: string
 *               restaurant:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload one or more images
 *     responses:
 *       201:
 *         description: Review created
 */
router.post('/', authenticateUser.isAuthorized, upload.array('images', 5), ReviewController.create);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 */
router.put('/:id', ReviewController.update);


/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       204:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
router.delete('/:id', ReviewController.remove);

module.exports = router;
