var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Vrne seznam vseh uporabnikov
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Seznam uporabnikov
 */
router.get('/', UserController.list);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Vrne podatke enega uporabnika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID uporabnika
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podatki uporabnika
 */
router.get('/:id', UserController.show);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Ustvari novega uporabnika
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Uporabnik ustvarjen
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registracija novega uporabnika
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Uporabnik registriran
 */

router.post('/login', UserController.login);
router.post('/register', UserController.signup);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Posodobi uporabnika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID uporabnika
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Uporabnik posodobljen
 */
router.put('/:id', UserController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Izbriši uporabnika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID uporabnika
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Uporabnik izbrisan
 */
router.delete('/:id', UserController.remove);

module.exports = router;
