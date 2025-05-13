
var express = require('express');
var router = express.Router();
var RestaurantController = require('../controllers/RestaurantController.js');

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Vrne seznam vseh restavracij
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Seznam restavracij
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *              
 */
router.get('/', RestaurantController.list);

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Vrne podatke ene restavracije
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID restavracije
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podatki restavracije
 *         content:
 *           application/json:
 *             schema:
 *              
 */
router.get('/:id', RestaurantController.show);

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Ustvari novo restavracijo
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               additional_payment:
 *                 type: number
 *                 format: float
 *               location:
 *                 type: string
 *               averageRating:
 *                 type: number
 *                 format: float
 *                 default: 0
 *               reviews:
 *                 type: array
 *                 default: [ ]
 *     responses:
 *       201:
 *         description: Restavracija ustvarjena
 */
router.post('/', RestaurantController.create);

/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Posodobi podatke restavracije
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID restavracije
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               additional_payment:
 *                 type: number
 *                 format: float
 *               location:
 *                 type: string
 *               averageRating:
 *                 type: number
 *                 format: float
 *               reviews:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: objectId
 *     responses:
 *       200:
 *         description: Restavracija posodobljena
 */
router.put('/:id', RestaurantController.update);

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Izbriši restavracijo
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID restavracije
 *     responses:
 *       200:
 *         description: Restavracija izbrisana
 */
router.delete('/:id', RestaurantController.remove);

module.exports = router;